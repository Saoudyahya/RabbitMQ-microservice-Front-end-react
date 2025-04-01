import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import RabbitmqListener from '../components/Rabbitmq-listener/listener';

import DefaultLayout from '../layout/DefaultLayout';

const RewardTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reward Notification" />
      <div className="flex flex-col gap-10">
        <RabbitmqListener value="Reward" ></RabbitmqListener>
       
      </div>
    </DefaultLayout>
  );
};

export default RewardTables;
