import {
  Authenticated,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { CompanyList } from "./pages";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";
import List from "./pages/workflows/list";
import CreateTask from "./pages/workflows/create";
import EditTask from "./pages/workflows/edit";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "sXS8cY-S9lo8S-oNneJk",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }>
                     <Route index element={<Home />} />
                     <Route path="/companies">
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<Edit />} />
                     </Route>

                     <Route
                    path="/tasks"
                    element={
                      <List>
                        <Outlet />
                      </List>
                    }
                  >
                    <Route path="new" element={<CreateTask />} />
                    <Route path="edit/:id" element={<EditTask />} />
                  </Route>
                  </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
