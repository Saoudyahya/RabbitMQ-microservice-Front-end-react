import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ProductTables from './pages/Product-Table';

import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';

import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import SupplierTables from './pages/Supplier-Table';
import OrderTables from './pages/Order-table';
import OperationTables from './pages/OpertionTable';
import ClientTables from './pages/Client-Table';
import RewardTables from './pages/Reward-Table';
import TransactionTables from './pages/Transaction-table';
import { isAdmin, isManager } from './components/jwt/jwt';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthorized = () => {
    return isAdmin() || isManager();
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="eCommerce Dashboard" />
                <ECommerce />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
      
        <Route
          path="/profile"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Profile" />
                <Profile />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form Elements" />
                <FormElements />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form Layout" />
                <FormLayout />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Tables" />
                <Tables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Product"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Product Actions" />
                <ProductTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Supplier"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Supplier Actions" />
                <SupplierTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Order"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Order Actions" />
                <OrderTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Operations"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Operations Actions" />
                <OperationTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Clients"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Clients Actions" />
                <ClientTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Rewards"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Rewards Actions" />
                <RewardTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Transactions"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Transactions Actions" />
                <TransactionTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/ui/alerts"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Alerts" />
                <Alerts />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/ui/buttons"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Buttons" />
                <Buttons />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/auth/signin"
          element={<SignIn />}
        />
        <Route
          path="/auth/signup"
          element={<SignUp />}
        />
      </Routes>
    </>
  );
}

export default App;
