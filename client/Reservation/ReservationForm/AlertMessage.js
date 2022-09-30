import React from "react";

export const TuesdayAlert = (
  <>
    <div className="alert alert-danger" role="alert">
      Sorry. We are closed on Tuesday.
    </div>
  </>
);

export const PastDateAlert = (
  <>
    <div className="alert alert-danger" role="alert">
      Reservation cannot be a past date.
    </div>
  </>
);

export const BeforeHoursMessage = (
  <>
    <div className="alert alert-danger" role="alert">
      Sorry. we are not open before 10:30 A.M.
    </div>
  </>
);

export const AfterHoursMessage = (
  <>
    <div className="alert alert-danger" role="alert">
      Sorry. we are closed after 9:30 P.M.
    </div>
  </>
);
