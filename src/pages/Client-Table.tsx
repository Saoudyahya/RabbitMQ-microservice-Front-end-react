import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import RabbitmqListener from '../components/Rabbitmq-listener/listener';

import DefaultLayout from '../layout/DefaultLayout';

const ClientTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Client Notification" />
      <div className="flex flex-col gap-10">
        <RabbitmqListener value="Client" ></RabbitmqListener>
       
      </div>
    </DefaultLayout>
  );
};

export default ClientTables;
