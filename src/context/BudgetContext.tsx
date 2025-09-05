import { useReducer, createContext, type ReactNode, useMemo } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"




type BudgetContextProps = {
    state:  BudgetState
    dispatch: React.ActionDispatch<[action: BudgetActions]>
    totalExpenses: number
    totalAvailable: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => { // definimos todas las variables que se usarán globalmente sin necesidad de props

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    
    const totalExpenses = useMemo(() => 
        state.expenses.reduce((total, expense) => expense.amount + total, 0)
    , [state.expenses])
    
    const totalAvailable = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                totalAvailable
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}
