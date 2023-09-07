import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopScreen from "./pages/TopScreen";
import SelectRecipientScreen from "./pages/SelectRecipientScreen";
import TransferScreen from "./pages/TransferScreen";
import SuccessScreen from "./pages/SuccessScreen";
import GenerateLinkScreen from "./pages/GenerateLinkScreen";
import CopyLinkScreen from "./pages/CopyLinkScreen";
import PaymentScreen from "./pages/PaymentScreen";
import HistoryScreen from "./pages/HistoryScreen";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TopScreen />} />
                <Route path="/select-recipient" element={<SelectRecipientScreen />} />
                <Route path="/transfer" element={<TransferScreen />} />
                <Route path="/success" element={<SuccessScreen />} />
                <Route path="/generate-link" element={<GenerateLinkScreen />} />
                <Route path="/copy-link" element={<CopyLinkScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/history" element={<HistoryScreen />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Routers