import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import RabbitmqListener from '../components/Rabbitmq-listener/listener';

import DefaultLayout from '../layout/DefaultLayout';

const OperationTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="operation Notification" />
      <div className="flex flex-col gap-10">
        <RabbitmqListener value="operation"></RabbitmqListener>
       
      </div>
    </DefaultLayout>
  );
};

export default OperationTables;
