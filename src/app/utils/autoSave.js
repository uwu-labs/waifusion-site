import { autorun, set, toJS } from 'mobx'

export function autoSave(_this, name) {
	if (typeof window !== 'undefined') {
		const storedJson = localStorage.getItem(name)
		if (storedJson) {
			set(_this, JSON.parse(storedJson))
		}
	}
	autorun(() => {
		if (typeof window !== 'undefined') {
		const value = toJS(_this)
		localStorage.setItem(name, JSON.stringify(value))
		}
	})
}