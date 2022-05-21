import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase_config";
import { useRouter } from "next/router";



const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const provider = new GoogleAuthProvider();
	const [user, setUser] = useState()
	const router = useRouter()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				console.log(user)
				setUser(user)
			} else {
				console.log("No User Found")
			}
		});
	}, []);

	const handleGoogleSignIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				setUser(user)
				router.push("/")
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}

	return (
		<AuthContext.Provider value={{ auth, handleGoogleSignIn, user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
