package model

import (
	"github.com/jinzhu/gorm"
)

func Db(dialect string, args ...interface{}) (*gorm.DB, error) {
	db, err := gorm.Open(dialect, args...)
	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&User{})

	return db, nil
}
