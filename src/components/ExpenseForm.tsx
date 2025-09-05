import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })

    const [error, setError] = useState('')
    const {dispatch, state, totalAvailable} = useBudget()

    const [previousAmount, setPreviousAmount] = useState(0)

    useEffect(()=> {
      if(state.editingId){
        const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]
        setExpense(editingExpense)
        setPreviousAmount(editingExpense.amount)
      }
    }, [state.editingId])

    const handleChangeDate = (value : Value) => { //Necesitamos una a parte para el date puesto que el datepicker usa su propio value
      setExpense({
        ...expense,
        date: value
      })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
      const {name, value} = e.target
      const isAmountField = ['amount'].includes(name) //Vemos si es el amount para convertir a número
      setExpense({
        ...expense,
        [name] : isAmountField ? +value : value //Si es amount convertimos a número, sino solamente pasamos el value
      })
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      //comprobamos que no haya ninguno vacío
      if(Object.values(expense).includes('')){
        setError('Todos los campos son obligatorios')
        return
      }
      

      //comprobamos no pasarnos del presupuesto total // cantidad actual - cantidad anterior no debe sobrepasar el presupuesto, ya que anterior siempre habrá si estamos editando, ahí es donde se setea 
      if((expense.amount - previousAmount) > totalAvailable){
        setError('Presupuesto sobrepasado')
        return
      }

      //añadimos o modificamos gasto
      if(state.editingId){
        dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}}) //el expense a editar será el mismo (...expense(todavía sin id)) + el id
      } else {
        dispatch({type: 'add-expense', payload: {expense}})
      }
      

      //reiniciamos el modal (state)
      setExpense({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
      })

      setError('')
      setPreviousAmount(0)
    }

    return (
      <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
          { state.editingId? 'Editar gasto' : 'Nuevo gasto' } </legend>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="expenseName"
              className="text-xl">
              Nombre gasto:
            </label>
            <input
              type="text"
              id="expenseName"
              placeholder="Añade el nombre del gasto"
              className="p-2 bg-slate-100"
              name="expenseName"
              value={expense.expenseName}
              onChange={handleChange}/>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="amount"
              className="text-xl">
              Cantidad:
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Añade la cantidad del gasto"
              className="p-2 bg-slate-100"
              name="amount"
              value={expense.amount}
              onChange={handleChange}/>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-xl">
              Categoría:
            </label>
            <select
              id="category"
              className="p-2 bg-slate-100"
              name="category"
              value={expense.category}
              onChange={handleChange}>
              <option value="">-- Selecciona una categoría --</option>
              {categories.map(categoria => (
                <option 
                key={categoria.id}
                value={categoria.id}>{categoria.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="amount"
              className="text-xl">
              Fecha Gasto:
            </label>
            <DatePicker
              className="bg-slate-100 p-2 border-0"
              value={expense.date}
              onChange={handleChangeDate}
            />
          </div>

          <input
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId? 'Guardar cambios' : 'Registrar gasto'}
          ></input>
      </form>
  )
}
