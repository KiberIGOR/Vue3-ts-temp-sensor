export interface Warning {
	text:string
	callback:(value?: number) => void
}

export const DeleteWarning:Warning = {
	text:'удалить значение',
	callback: () => {}
}