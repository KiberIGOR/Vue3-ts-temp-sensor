import { defineStore } from "pinia"
import { Measure, MeasureMockDataOne, MeasureMockDataThree, MeasureMockDataTwo } from "../measure";

interface MeasuresState {
	/** Объект со списком id */
	ids: number[]
	/** Map со структурой ключ(id): объект записи */
	all: Map<number, Measure>
	/** Селект записи для отображения на странце /edit
	 * @default null */
	selectedMeasure: Measure | null
}

export const useMeasures = defineStore("measures", {
	state: (): MeasuresState => ({
		ids: [],
		all: new Map([]),
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
		//Функцая возвращает массив записей по убыванию
		sortedMeasures:(state:MeasuresState):Measure[] => {
			if (state.all instanceof Map) {
				return Array.from(state.all.values()).sort((a, b) => b.id - a.id);
			} else {
				throw new Error("В state.all лежит не Map");
			}
		}, 
		maxId:(state):number => {
			return Math.max(...state.ids) === -Infinity ? 0 : Math.max(...state.ids) ;
		} 
	},
	persist: {
		serializer: {
			serialize: mapToJSON,
			deserialize: jsonToMap,
		}
	},
})

// Функция для сериализации Map в JSON для persist
function mapToJSON(obj:object):string {
		return JSON.stringify(obj, (key, value) => {
			if (key === 'all') {
				return Array.from(value.entries());
			}
			return value;
		});
}

// Функция для десериализации JSON в Map для persist
function jsonToMap(json:string):object {
  return JSON.parse(json, (key, value) => {
		if (key === 'all') {
			return new Map(value);
		}
		return value;
	});;
}