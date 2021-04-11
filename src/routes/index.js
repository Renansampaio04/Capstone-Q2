import { Switch, Route } from "react-router-dom";
import UpProfileComp from "../components/UpProfileComp";
import UpProfileDev from "../components/UpProfileDev";
import PageLogReg from "../pages/PageLogReg";
// import GetallCompanys from "../components/GetOneCompany";
// import UpProfileComp from "../components/UpProfileComp";
// import UpProfileDev from "../components/UpProfileDev";
// import GetAllUsersCompany from "../components/GetAllUsersCompany";
import GetOneCompany from "../components/GetOneCompany";
import GetOneDev from "../components/GetOneDev";
import GetAllDev from "../components/GetAllUsersDev";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <PageLogReg />
      </Route>
      <Route exact path="/users/comp">
        <GetOneDev />
        <UpProfileComp />
        <GetOneCompany />
      </Route>
      <Route exact path="/users/dev">
        <GetAllDev />
        <GetOneDev />
        <UpProfileDev />
      </Route>
    </Switch>
  );
};

export default Routes;
