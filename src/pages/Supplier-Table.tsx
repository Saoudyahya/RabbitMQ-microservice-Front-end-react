import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import RabbitmqListener from '../components/Rabbitmq-listener/listener';

import DefaultLayout from '../layout/DefaultLayout';

const SupplierTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Supplier Notification" />
      <div className="flex flex-col gap-10">
        <RabbitmqListener value="supplier"></RabbitmqListener>
       
      </div>
    </DefaultLayout>
  );
};

export default SupplierTables;
