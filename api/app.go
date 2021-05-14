package main

import "github.com/denniss17/energy/api/core"

func main() {
	var err error

	app := &core.Application{}

	defer func(app *core.Application) {
		if err := app.Close(); err != nil {
			panic(err)
		}
	}(app)

	if err = app.Init(); err != nil {
		panic(err)
	}

	if err = app.Run(); err != nil {
		panic(err)
	}
}
