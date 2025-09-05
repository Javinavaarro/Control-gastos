import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {

  const {state} = useBudget()

  const filterExpensed = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses

  const isEmpty = useMemo(() => filterExpensed.length === 0, [filterExpensed])



  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
        {isEmpty ? <p className="text-gray-600 font-bold text-2xl text-center">No hay gastos</p> : (
            <>
                <p className="text-gray-600 font-bold text-2xl my-5 text-center">Listado de gastos</p>
                {filterExpensed.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    )
                )}
                
            </>
        )}
    </div>
  )
}
