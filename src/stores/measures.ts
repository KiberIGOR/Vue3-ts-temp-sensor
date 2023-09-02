import { defineStore } from "pinia"
import { Measure, MeasureMockDataOne, MeasureMockDataThree, MeasureMockDataTwo } from "../measure";

interface MeasuresState {
	ids: number[]
	all: Map<number, Measure>
	selectedMeasure: Measure | null
}

export const useMeasures = defineStore("measures", {
	state: (): MeasuresState => ({
		ids: [MeasureMockDataOne.id,MeasureMockDataTwo.id,MeasureMockDataThree.id],
		all: new Map([
			[MeasureMockDataOne.id,MeasureMockDataOne],
			[MeasureMockDataTwo.id,MeasureMockDataTwo],
			[MeasureMockDataThree.id,MeasureMockDataThree]
		]),
		selectedMeasure: null
	}),
	
	actions: {
		setEditedMeasure(measure:Measure | null) {
			this.selectedMeasure = measure;
		},
		createOrResetMeasure(measure:Measure) {
			if(!this.ids.includes(measure.id)) {
				this.ids.push(measure.id)
			};
			this.all.set(measure.id,measure);
		},
		deleteMeasure(id:number) {
			this.ids = this.ids.filter((el)=> el !== id);
			this.all.delete(id);
		}
	},
	getters: {
		sortedMeasures:(state):Measure[] => {
			return Array.from(state.all.values()).sort((a, b) => b.id - a.id);
		}, 
		maxId:(state):number => {
			return Math.max(...state.ids) === -Infinity ? 0 : Math.max(...state.ids) ;
		} 
	}
})