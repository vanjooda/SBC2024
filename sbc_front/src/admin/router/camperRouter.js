import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const Loading = <Spinner animation="border"/>


const camperRouter = () => {
    return[
        {
            path: "",
            element : <Navigate replace to="list"/>
        }

    ]
}

export default camperRouter;