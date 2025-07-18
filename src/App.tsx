import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MejoresPanoramas from "./pages/MejoresPanoramas";
import DescuentosExclusivos from "./pages/DescuentosExclusivos";
import FiestasImperdibles from "./pages/FiestasImperdibles";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EventDetail from "./pages/EventDetail";
import AireLibre from "./pages/AireLibre";
import Gastronomia from "./pages/Gastronomia";
import Cultura from "./pages/Cultura";
import Fiesta from "./pages/Fiesta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mejores-panoramas" element={<MejoresPanoramas />} />
          <Route path="/descuentos-exclusivos" element={<DescuentosExclusivos />} />
          <Route path="/fiestas-imperdibles" element={<FiestasImperdibles />} />
          <Route path="/aire-libre" element={<AireLibre />} />
          <Route path="/gastronomia" element={<Gastronomia />} />
          <Route path="/cultura" element={<Cultura />} />
          <Route path="/fiesta" element={<Fiesta />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:id" element={<EventDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
