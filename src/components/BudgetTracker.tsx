import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; 
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const {state, dispatch, totalExpenses, totalAvailable} = useBudget()

    const progressBarValue = +((totalExpenses / state.budget) * 100).toFixed(2) //con 2 decimales, sacamos el porcentaje de lo que va gastado

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={progressBarValue}
                styles={buildStyles({
                    pathColor: progressBarValue === 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textSize: '8px',
                    textColor: '#3b82f6'
                })}
                text={`${progressBarValue}% Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button
            type="button"
            className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:cursor-pointer"
            onClick={() => dispatch({type:'restart-app'})}
            >
                Reiniciar gastos
            </button>

            <AmountDisplay
                label="Presupuesto"
                amount={state.budget}
            />
            <AmountDisplay
                label="Disponible"
                amount={totalAvailable}
            />
            <AmountDisplay
                label="Gastado"
                amount={totalExpenses}
            />
        </div>
    </div>
  )
}
