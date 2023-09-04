//файл с типом для объекта подтверждения(Warning)
export interface Warning {
  /** Текст для показа Warning */
  text: string;
  /** Этот метод будет вызван после подтверждения дествия
   * @default ()=>{}*/
  callback: (value?: number) => void;
}
