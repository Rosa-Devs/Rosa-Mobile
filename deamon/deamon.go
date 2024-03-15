package deamon

import (
	"context"
	"log"

	"github.com/Rosa-Devs/core/core"
	"github.com/Rosa-Devs/core/store"
)

func NewApp() *App {
	return &App{}
}

type App struct {
	C        core.Core
	Addres   string
	wailsctx context.Context
}

func (a *App) GetPort() string {
	// log.Println("Addr:", a.Addres)
	return a.Addres
}

func (a *App) Init(path string, addres string) {
	Store, err := store.NewStore(path)
	if err != nil {
		log.Println("Fail to load store:", err)
		return
	}
	a.C = core.Core{
		Store: *Store,
	}

	a.Addres = a.StartApi(addres)
	a.StartManager()

	// go a.EventHandler()
}

func (a *App) StartApi(address string) string {
	return a.C.StartApi(address)
}

func (a *App) StartManager() {
	a.C.StartManager()
}

func (a *App) GetProfile() string {
	return a.C.GetProfile()
}
