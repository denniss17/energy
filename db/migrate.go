package db

import (
	"fmt"
	"github.com/go-pg/pg/v9"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func MigrateDb(db *pg.DB) error {

	databaseUrl := fmt.Sprintf("postgres://%s:%s@%s/%s",
		db.Options().User,
		db.Options().Password,
		db.Options().Addr,
		db.Options().Database)

	migrator, err := migrate.New("file://db/migrations", databaseUrl)
	if err != nil {
		return err
	}

	err = migrator.Up()

	if err != nil && err != migrate.ErrNoChange {
		return err
	}

	return nil
}
