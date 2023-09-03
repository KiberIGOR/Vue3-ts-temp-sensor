import { defineStore } from "pinia"
import { Warning } from "../warning";
interface WarningState {
	isVisible:boolean
	warningObj:Warning
}

export const useWarning = defineStore("warning", {
	state: (): WarningState => ({
		isVisible: false,
		warningObj: {
			text:'',
			callback: () => {}
		}
	}),
	
	actions: {
		toggleIsVisiblePopup(bool:boolean) {
			this.isVisible = bool;
		},
		initialWarning(obj:Warning) {
			this.warningObj = obj;
			this.toggleIsVisiblePopup(true);
		}
	},
	getters: {
	}
})