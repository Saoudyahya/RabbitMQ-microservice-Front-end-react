import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import RabbitmqListener from '../components/Rabbitmq-listener/listener';

import DefaultLayout from '../layout/DefaultLayout';

const OrderTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order Notification" />
      <div className="flex flex-col gap-10">
        <RabbitmqListener value="Order"></RabbitmqListener>
       
      </div>
    </DefaultLayout>
  );
};

export default OrderTables;
