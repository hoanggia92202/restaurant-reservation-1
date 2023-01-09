import React from "react";
import { useHistory } from "react-router-dom";

const CancelAlert = ({id}) => {
    const history = useHistory();

    const undoCancelReservation = (id) => {
        const cancel = document.getElementById(id);
        cancel.classList.remove("showCancelAlert");
        cancel.classList.add("hideCancelAlert");
    };

    const confirmCancelReservation = async (id) => {
        const cancel = document.getElementById(id);
        cancel.classList.remove("showCancelAlert");
        cancel.classList.add("hideCancelAlert");

        try{
            const response = await fetch(`/reservations/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: { status: "cancelled" } })
                }
            );

            if (response.status === 204) {
                history.go(0);
            }else{
                console.log("Error deleting record !")
            }
        }catch(err){
            console.log("Error: ", err);
        }
    };

    return(
        <td className="cancelAlert" id={id}>
            <p>
              Do you want to cancel this reservation? This cannot be undone.
            </p>
            <button
              onClick={() => confirmCancelReservation(id)}
            >
              OK
            </button>
            <button
              onClick={() => undoCancelReservation(id)}
            >
              cancel
            </button>
        </td>
    )
}

export default CancelAlert;