import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./Auth";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase_config";



const DataContext = createContext();

export function DataContextProvider({ children }) {

	const [savedData, setSavedData] = useState([])
	const { user } = useAuthContext()

	useEffect(() => {
		if (user) {
			const q = query(collection(db, "PLAYLIST"), orderBy("title"), where("uid", "==", user && user.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.list = obj.list.reverse()
					obj.dataID = doc.id
					arr.push(obj);
				});
				setSavedData(arr)
			});

			return () => {
				unsubscribe()
			};
		}
	}, [user]);

	return (
		<DataContext.Provider value={{ savedData }}>
			{children}
		</DataContext.Provider>
	);
}

export function useDataContext() {
	return useContext(DataContext);
}
