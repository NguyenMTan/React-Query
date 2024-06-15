import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import ReactQueryPostPage from "./pages/ReactQueryPostPage";
import ReactPostPage from "./pages/ReactPostPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryPostDetailsPage from "./pages/ReactQueryPostDetailsPage";
import ReactPostDetailsPage from "./pages/ReactPostDetailsPage";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/react-query"
                        element={<ReactQueryPostPage />}
                    ></Route>
                    <Route
                        path="/react-query/:id"
                        element={<ReactQueryPostDetailsPage />}
                    ></Route>
                    <Route path="/react" element={<ReactPostPage />}></Route>
                    <Route
                        path="/react/:id"
                        element={<ReactPostDetailsPage />}
                    ></Route>
                    <Route path="/" element={<HomePage />}></Route>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
