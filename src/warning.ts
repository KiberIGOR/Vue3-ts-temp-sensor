export interface Warning {
	text:string
	/**
   * This method will be called after ``
   *
   * @default JSON.parse
   */
	callback:(value?: number) => void
}

export const DeleteWarning:Warning = {
	text:'удалить значение',
	callback: () => {}
}