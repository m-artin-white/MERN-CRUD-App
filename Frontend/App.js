import { useState, useEffect } from "react";
import axios from 'axios';

function App() {

  useEffect(() => {
    getCustomers();
    getOrders();
    getPhones();
  }, []);

  const [customers, setCustomers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [phones, setPhones] = useState(null);

  const getCustomers = async () =>{
    const res = await axios.get("http://localhost:3000/customers");
    console.log(res);
    setCustomers(res.data.customers);
    console.log(res);
  };

  const getOrders = async () =>{
    const res = await axios.get("http://localhost:3000/orders");
    console.log(res);
    setOrders(res.data.orders);
    console.log(res);
  }; 

  const getPhones = async () =>{
    const res = await axios.get("http://localhost:3000/phones");
    console.log(res);
    setPhones(res.data.phones);
    console.log(res);
  };

  const [createCustomerForm, setCustomerCreateForm] = useState({
    title: '',
    firstname: '',
    surname: '',
    mobile: '',
    email: '',
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingTown: '',
    billingCounty:'',
    billingEircode:'',
    shippingAddressLine1:'',
    shippingAddressLine2:'',
    shippingTown:'',
    shippingCounty:'',
    shippingEircode:''
  });

  const updateCreateCustomerFormFields = (e) =>{
    const {name, value} = e.target;
    setCustomerCreateForm({
      ...createCustomerForm,
      [name]: value,
    })
  };

  const createCustomer = async (e) =>{
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/customers", createCustomerForm);
    setCustomers([...customers ,res.data.customer]);
    setCustomerCreateForm({
      title: '',
      firstname: '',
      surname: '',
      mobile: '',
      email: '',
      billingAddressLine1: '',
      billingAddressLine2: '',
      billingTown: '',
      billingCounty:'',
      billingEircode:'',
      shippingAddressLine1:'',
      shippingAddressLine2:'',
      shippingTown:'',
      shippingCounty:'',
      shippingEircode:''
    })
    console.log(res);
  };

  const [createPhoneForm, setPhoneCreateForm] = useState({
    manufacturer: '',
    model: '',
    price: ''
  });

  const updateCreatePhoneFormFields = (e) =>{
    const {name, value} = e.target;
    setPhoneCreateForm({
      ...createPhoneForm,
      [name]: value,
    });
  };

  const createPhone = async (e) =>{
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/phones", createPhoneForm);
    setPhones([...phones ,res.data.phone]);
    setPhoneCreateForm({
      manufacturer: '',
      model: '',
      price: ''
    })
    console.log(res);
  };

  const [createOrderForm, setOrderCreateForm] = useState({
    customer: '',
    phone: '',
    quantity: ''
  });

  const updateCreateOrderFormFields = (e) =>{
    const {name, value} = e.target;
    setOrderCreateForm({
      ...createOrderForm,
      [name]: value,
    });
  };

  const createOrder = async (e) =>{
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/orders", createOrderForm);
    setOrders([...orders ,res.data.order]);
    setOrderCreateForm({
      customer: '',
      phone: '',
      quantity: ''
    })
    console.log(res);
  };

  //Delete Customer
  const deleteCustomer = async(_id) =>{
    const res = await axios.delete(`http://localhost:3000/customers/${_id}`);
    //console.log(res);
    const newCustomer = [...customers].filter(customer =>{
      return customer._id !== _id;
    });

    setCustomers(newCustomer);
  }

  //Delete Phone
  const deletePhone = async(_id) =>{
    const res = await axios.delete(`http://localhost:3000/phones/${_id}`);
    //console.log(res);
    const newPhone = [...phones].filter(phone =>{
      return phone._id !== _id;
    });

    setPhones(newPhone);
  }

  //Delete Order
  const deleteOrder = async(_id) =>{
    const res = await axios.delete(`http://localhost:3000/orders/${_id}`);
    //console.log(res);
    const newOrder = [...orders].filter(order =>{
      return order._id !== _id;
    });

    setOrders(newOrder);
  }

  //Update Feature below
  const [updateCustomerForm, setCustomerUpdateForm] = useState({
      _id: null,
      title: '',
      firstname: '',
      surname: '',
      mobile: '',
      email: '',
      billingAddressLine1: '',
      billingAddressLine2: '',
      billingTown: '',
      billingCounty:'',
      billingEircode:'',
      shippingAddressLine1:'',
      shippingAddressLine2:'',
      shippingTown:'',
      shippingCounty:'',
      shippingEircode:''
  });
  const [updatePhoneForm, setPhoneUpdateForm] = useState({
      _id: null,
      manufacturer: '',
      model: '',
      price: ''
  });
  const [updateOrderForm, setOrderUpdateForm] = useState({
      _id: null,
      customer: '',
      phone: '',
      quantity: ''
  });

  const handleUpdateFieldChangeCustomer = (e) =>{
    const {value, name} = e.target;

    setCustomerUpdateForm({
      ...updateCustomerForm,
      [name]: value,
    })
  }

  const handleUpdateFieldChangePhone = (e) =>{
    const {value, name} = e.target;

    setPhoneUpdateForm({
      ...updatePhoneForm,
      [name]: value,
    })
  }

  const handleUpdateFieldChangeOrder = (e) =>{
    const {value, name} = e.target;

    setOrderUpdateForm({
      ...updateOrderForm,
      [name]:value,
    })
  };

  const toggleUpdateCustomer = (customer) =>{
    //console.log(customer);
    setCustomerUpdateForm({
      title: customer.title,
      firstname: customer.firstname,
      surname: customer.surname,
      mobile: customer.mobile,
      email: customer.email,
      billingAddressLine1: customer.billingAddressLine1,
      billingAddressLine2: customer.billingAddressLine2,
      billingTown: customer.billingTown,
      billingCounty:customer.billingCounty,
      billingEircode:customer.billingEircode,
      shippingAddressLine1:customer.shippingAddressLine1,
      shippingAddressLine2:customer.shippingAddressLine2,
      shippingTown:customer.shippingTown,
      shippingCounty:customer.shippingCounty,
      shippingEircode: customer.shippingEircode,
      _id: customer._id
    });
  };

  const toggleUpdatePhone = (phone) =>{
    setPhoneUpdateForm({
      manufacturer: phone.manufacturer,
      model: phone.model,
      price: phone.price,
      _id: phone._id
    });
  };

  const toggleUpdateOrder = (order) =>{

    setOrderUpdateForm({
      customer: order.customer,
      phone: order.phone,
      quantity: order.quantity,
      _id: order._id
    })
  };

  const updateCustomer = async() =>{

    const {title, firstname, surname, mobile, email, billingAddressLine1, billingAddressLine2, billingTown, billingCounty, billingEircode, shippingAddressLine1, shippingAddressLine2, shippingTown, shippingCounty, shippingEircode} = updateCustomerForm;

    const res = await axios.put(`http://localhost:3000/customers/${updateCustomerForm._id}`,{
      title, 
      firstname, 
      surname, 
      mobile, 
      email, 
      billingAddressLine1,
      billingAddressLine2, 
      billingTown,
      billingCounty, 
      billingEircode,
      shippingAddressLine1, 
      shippingAddressLine2, 
      shippingTown,
      shippingCounty, 
      shippingEircode
    });

    setCustomerUpdateForm({
      _id: null,
      title: '',
      firstname: '',
      surname: '',
      mobile: '',
      email: '',
      billingAddressLine1: '',
      billingAddressLine2: '',
      billingTown: '',
      billingCounty:'',
      billingEircode:'',
      shippingAddressLine1:'',
      shippingAddressLine2:'',
      shippingTown:'',
      shippingCounty:'',
      shippingEircode:''
    })

    //console.log(res);
  };

  const updatePhone = async() =>{
    const {manufacturer, model, price} = updatePhoneForm;

    const res = await axios.put(`http://localhost:3000/phones/${updatePhoneForm._id}`,{
      manufacturer, 
      model,
      price
    });

    setPhoneUpdateForm({
      manufacturer: '',
      model: '',
      price: ''
    });
  };

  const updateOrder = async () =>{
    const {customer, phone, quantity} = updateOrderForm;

    const res = await axios.put(`http://localhost:3000/orders/${updateOrderForm._id}`,{
      customer, 
      phone, 
      quantity
    });

    setOrderUpdateForm({
      _id: null,
      customer: '',
      phone: '',
      quantity: ''
    })
  };

  return (
    <div className="App">
    <div>
    <h1>Single Page Application</h1>
    <h3>Customers:</h3>
    {customers && customers.map((customer) =>{
      return <div key ={customer._id}>
        <h5>{[customer.title," ", customer.firstname, " ", customer.surname]}</h5>
        <button onClick={()=>deleteCustomer(customer._id)}>Delete Customer</button>
        <button onClick={()=>toggleUpdateCustomer(customer)}>Update Customer</button>
        </div>
    })}
    </div>
    <div>
    <h3>Phones:</h3>
    {phones && phones.map((phone) =>{
      return <div key ={phone._id}>
        <h5>{[phone.manufacturer," ", phone.model, " ", phone.price]}</h5>
        <button onClick={()=>deletePhone(phone._id)}>Delete Phone</button>
        <button onClick={() => toggleUpdatePhone(phone)}>Update Phone</button>
        </div>
    })}
    </div>
    <div>
    <h3>Orders:</h3>
    {orders && orders.map((order) =>{
      return <div key={order._id}>
        <h5>{[order.customer," ", order.phone, " ", order.quantity]}</h5>
        <button onClick={()=>deleteOrder(order._id)}>Delete Order</button>
        <button onClick={()=>toggleUpdateOrder(order)}>Update Order</button>
        </div>
    })}
    </div>
      <h3>Create User</h3>
      <form onSubmit={createCustomer}>
      <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.title} name = "title" type="text" placeholder="Title"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.firstname} name = "firstname" type="text" placeholder="Firstname"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.surname} name = "surname" type="text" placeholder="Surname"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.mobile} name = "mobile" type="text" placeholder="Mobile"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.email} name = "email" type="text" placeholder="Email"></input>
        <br></br>
        <br></br>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.billingAddressLine1} name = "billingAddressLine1" type="text" placeholder="Billing Address Line 1"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.billingAddressLine2} name = "billingAddressLine2" type="text" placeholder="Billing Address Line 2"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.billingTown} name = "billingTown" type="text" placeholder="Billing Town"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.billingCounty} name = "billingCounty" type="text" placeholder="Billing County"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.billingEircode} name = "billingEircode" type="text" placeholder="Billing Eircode"></input>
        <br></br>
        <br></br>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.shippingAddressLine1} name = "shippingAddressLine1" type="text" placeholder="Shipping Address Line 1"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.shippingAddressLine2} name = "shippingAddressLine2" type="text" placeholder="Shipping Address Line 2"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.shippingTown} name = "shippingTown" type="text" placeholder="Shipping Town"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.shippingCounty} name = "shippingCounty" type="text" placeholder="Shipping County"></input>
        <input onChange ={updateCreateCustomerFormFields} value = {createCustomerForm.shippingEircode} name = "shippingEircode" type="text" placeholder="Shipping Eircode"></input>
        
        <br></br>
        <br></br>
        <button type = "submit">Create Customer</button>
      </form>

      <br></br>
      <h3>Create Phone</h3>
      <form onSubmit={createPhone}>
        <input onChange ={updateCreatePhoneFormFields} value = {createPhoneForm.manufacturer} name = "manufacturer" type="text" placeholder = "Manufacturer"></input>
        <input onChange ={updateCreatePhoneFormFields} value = {createPhoneForm.model} name = "model" type="text" placeholder = "Model"></input>
        <input onChange ={updateCreatePhoneFormFields} value = {createPhoneForm.price} name = "price" type="text" placeholder = "Price"></input>
        <br></br>
        <br></br>
        <button type = "submit">Create Phone</button>
      </form>

      <h3>Create Order</h3>
      <form onSubmit={createOrder}>
        <input onChange ={updateCreateOrderFormFields} value ={createOrderForm.customer} name = "customer" type="text" placeholder = "Customer Name"></input>
        <input onChange ={updateCreateOrderFormFields} value = {createOrderForm.phone} name = "phone" type="text" placeholder = "Phone"></input>
        <input onChange ={updateCreateOrderFormFields} value = {createOrderForm.quantity} name = "quantity" type="text" placeholder = "Quantity"></input>
        <br></br>
        <br></br>
        <button type = "submit">Create Order</button>
      </form>
      <div>
        <h3>Update Customer</h3>
        <form onSubmit={updateCustomer}>
        <input onChange={handleUpdateFieldChangeCustomer} value ={updateCustomerForm.title} name = "title" type="text" placeholder="Title"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.firstname} name = "firstname" type="text" placeholder="Firstname"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.surname} name = "surname" type="text" placeholder="Surname"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.mobile} name = "mobile" type="text" placeholder="Mobile"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.email} name = "email" type="text" placeholder="Email"></input>
        <br></br>
        <br></br>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.billingAddressLine1} name = "billingAddressLine1" type="text" placeholder="Billing Address Line 1"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.billingAddressLine2} name = "billingAddressLine2" type="text" placeholder="Billing Address Line 2"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.billingTown} name = "billingTown" type="text" placeholder="Billing Town"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.billingCounty} name = "billingCounty" type="text" placeholder="Billing County"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.billingEircode} name = "billingEircode" type="text" placeholder="Billing Eircode"></input>
        <br></br>
        <br></br>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.shippingAddressLine1} name = "shippingAddressLine1" type="text" placeholder="Shipping Address Line 1"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.shippingAddressLine2} name = "shippingAddressLine2" type="text" placeholder="Shipping Address Line 2"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.shippingTown}  name = "shippingTown" type="text" placeholder="Shipping Town"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.shippingCounty} name = "shippingCounty" type="text" placeholder="Shipping County"></input>
        <input onChange={handleUpdateFieldChangeCustomer} value = {updateCustomerForm.shippingEircode} name = "shippingEircode" type="text" placeholder="Shipping Eircode"></input>
        <br></br>
        <br></br>
        <button type = "submit">Update Customer</button>
        </form>
        <br></br>
        <h3>Update Phone</h3>
        <form onSubmit={updatePhone}>
        <input onChange={handleUpdateFieldChangePhone} value = {updatePhoneForm.manufacturer} name = "manufacturer" type="text" placeholder = "Manufacturer"></input>
        <input onChange={handleUpdateFieldChangePhone} value = {updatePhoneForm.model} name = "model" type="text" placeholder = "Model"></input>
        <input onChange={handleUpdateFieldChangePhone} value = {updatePhoneForm.price} name = "price" type="text" placeholder = "Price"></input>
        <br></br>
        <br></br>
        <button type = "submit">Update Phone</button>
        </form>
        <br></br>
        <h3>Update Order</h3>
        <form onSubmit={updateOrder}>
        <input onChange={handleUpdateFieldChangeOrder} value = {updateOrderForm.customer} name = "customer" type="text" placeholder = "Customer Name"></input>
        <input onChange={handleUpdateFieldChangeOrder} value = {updateOrderForm.phone} name = "phone" type="text" placeholder = "Phone"></input>
        <input onChange={handleUpdateFieldChangeOrder} value = {updateOrderForm.quantity} name = "quantity" type="text" placeholder = "Quantity"></input>
        <br></br>
        <br></br>
        <button type = "submit">Update Order</button>
        </form>
      </div>
    </div>
    
  );
}

export default App;
