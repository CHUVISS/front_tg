package service

import (
	"myapp/internal/config"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// Проверка авторизации
func JWTMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "missing or malformed jwt"})
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenStr == authHeader {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "missing or malformed jwt"})
		}

		token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return config.JwtKey, nil
		})
		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				return c.JSON(http.StatusUnauthorized, map[string]string{"message": "invalid jwt signature"})
			}
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "bad request"})
		}

		if claims, ok := token.Claims.(*Claims); ok && token.Valid {
			c.Set("userEmail", claims.Username)
			return next(c)
		}

		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "unauthorized"})
	}
}

func GenerateJWT(username string) string {
	expirationTime := time.Now().Add(60 * time.Minute)
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(config.JwtKey)
	if err != nil {
		panic(err)
	}

	return tokenString
}
