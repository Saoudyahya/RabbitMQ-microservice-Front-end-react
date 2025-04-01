import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import RabbitmqListener from '../components/Rabbitmq-listener/listener';

import DefaultLayout from '../layout/DefaultLayout';

const ProductTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Notification" />
      <div className="flex flex-col gap-10">
        <RabbitmqListener value="Product" ></RabbitmqListener>
       
      </div>
    </DefaultLayout>
  );
};

export default ProductTables;
