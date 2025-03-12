// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { PropsWithChildren, useReducer } from "react";
// import { SchedulerContext } from "./Scheduler.context";
// import { data } from "../../../mocks";
// import { Room } from "../Scheduler.interface";

// const defaultState = {
//   rooms: data,
// };

// function schedulerReducer(state: any, action: any) {
//   if (action.type === "ADD") {
//     const m = state.rooms.map((room: Room, index: number) => {
//       if (index === 0) {
//         return {
//           ...room,
//           periods: [...room.periods, action.item],
//         };
//       }
//       return room;
//     });
//     return {
//       rooms: m,
//     };
//   }

//   return {
//     rooms: [...state.rooms],
//   };
// }

// export function SchedulerProvider(props: PropsWithChildren) {
//   const [state, dispatch] = useReducer(schedulerReducer, defaultState);

//   const addPeriodHandler = () => {
//     dispatch({
//       type: "ADD",
//       item: {
//         id: 4,
//         start: new Date("11-22-2024"),
//         end: new Date("11-30-2024"),
//         status: "PERAAA",
//       },
//     });
//   };

//   const schedulerContext = {
//     rooms: state!.rooms,
//     addPeriod: addPeriodHandler,
//   };

//   return (
//     <SchedulerContext.Provider value={schedulerContext}>
//       {props.children}
//     </SchedulerContext.Provider>
//   );
// }
