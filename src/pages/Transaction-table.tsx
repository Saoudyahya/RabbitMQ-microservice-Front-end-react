import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import RabbitmqListener from '../components/Rabbitmq-listener/listener';

import DefaultLayout from '../layout/DefaultLayout';

const TransactionTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Transaction Notification" />
      <div className="flex flex-col gap-10">
        <RabbitmqListener value="Transaction"></RabbitmqListener>
       
      </div>
    </DefaultLayout>
  );
};

export default TransactionTables;
