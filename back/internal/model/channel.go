package model

type ChannelsInfo struct {
	Url             string
	CountViews      int64
	CountDayViews   *int64
	CountMonthViews *int64
	CountWeekViews  *int64
}
