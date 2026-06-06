import { useAuth } from '../auth/AuthContext'
import {
  FaShoppingBag,
  FaHeart,
  FaHome,
  FaShieldAlt,
  FaTachometerAlt,
  FaBox,
  FaCog,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa'


const C = {
  gold: '#C9A84C',
  cream: '#F5ECD7',
  maroon: '#3D0000',
  crimson: '#8B1A1A',
  white: '#FFFFFF',
}

export default function CustomerPortal({
  setPage,
  profile,
   wishlist
}) {
 const { user, logout } = useAuth()

  return (
    <div
      style={{
  minHeight: '100vh',
  background: '#F5ECD7',
  padding: '80px 0 0',
}}
    >
      <div
  style={{
    maxWidth: '1250px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '0',
    boxShadow: '0 8px 30px rgba(0,0,0,.08)',
    overflow: 'hidden',
  }}
>
        

        {/* Main Layout */}
        
  <div
  style={{
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: '0',

    alignItems: 'stretch',
    minHeight: 'calc(100vh - 80px)',
  }}
>

         {/* Sidebar */}
<div
  style={{
    background: 'linear-gradient(180deg,#220000,#4d0000)',
    color: '#fff',
    padding: '20px',
    borderRight: '1px solid rgba(255,255,255,.08)',

    display: 'flex',
    flexDirection: 'column',

    minHeight: '100%',
    height: 'auto',
  }}
>
  <button className="active-menu">
  <FaUser size={16} style={{ marginRight: '10px' }} />
  My Account
</button>

  <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  }}
>
  {/* Customer Profile */}
<div
  style={{
    textAlign: 'center',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(255,255,255,.12)',
    marginBottom: '20px',
  }}
>
  <div
    style={{
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: '#A61B1B',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      fontWeight: '700',
      margin: '0 auto 12px',
    }}
  >
    C
  </div>

  <h3
    style={{
      margin: 0,
      fontSize: '18px',
      color: '#fff',
    }}
  >
    Customer
  </h3>

  <p
    style={{
      margin: '4px 0 0',
      fontSize: '13px',
      color: 'rgba(255,255,255,.7)',
    }}
  >
    customer@gmail.com
  </p>
</div>
    <button className="menu-btn">
  <FaTachometerAlt size={16} /> Dashboard
</button>

<button
  className="menu-btn"
  onClick={() => setPage('orders')}
>
  <FaBox size={16} /> My Orders
</button>

<button
  className="menu-btn"
  onClick={() => setPage('wishlist')}
>
  <FaHeart size={16} /> Wishlist
</button>

<button
  className="menu-btn"
  onClick={() => setPage('addresses')}
>
  <FaHome size={16} /> Addresses
</button>

<button
  className="menu-btn"
  onClick={() => setPage('settings')}
>
  <FaCog size={16} /> Settings
</button>
   




<div
  style={{
    background: 'rgba(255,255,255,.08)',
    borderRadius: '12px',
    padding: '14px',
    marginBottom: '20px',
  }}
>
  <div
    style={{
      fontSize: '13px',
      color: '#E8C97A',
      marginBottom: '6px',
    }}
  >
    ⭐ Reward Points
  </div>

  <div
    style={{
      fontSize: '24px',
      fontWeight: '700',
      color: '#fff',
    }}
  >
    250
  </div>

  <div
    style={{
      fontSize: '12px',
      color: 'rgba(255,255,255,.7)',
    }}
  >
    Available Points
  </div>
</div>

<button
  className="menu-btn"
  onClick={() => setPage('offers')}
>
  🔔 Notifications
</button>

<button
  className="menu-btn"
  onClick={() => setPage('support')}
>
  🎧 Help & Support
</button>

{/* Push only Logout to bottom */}
<div style={{ marginTop: 'auto' }}>
  <button
    className="menu-btn"
    onClick={() => {
      logout()
      setPage('home')
    }}
  >
    🚪 Logout
  </button>
</div>
  </div>
</div>

          {/* Orders */}
          <div
  
  style={{
   padding: '20px',
    background: '#fff',
  }}
>

          
           <div style={{ marginBottom: '25px' }}>
  <h1
    style={{
      color: C.maroon,
      fontSize: '1.7rem',
      marginBottom: '10px',
    }}
  >
    Hello, {user?.name} 👋
  </h1>

  <p style={{ color: '#666' }}>
    Welcome back to Puji Home Foods

  </p>
  <div
  
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    gap: '14px',
    marginTop: '20px',
    marginBottom: '20px',
  }}
>

 <DashboardCard
 icon={<FaShoppingBag size={22} color="#C9A84C" />}
 title="Total Orders"
 value="12"
 subtitle="View all orders"
 onClick={() => setPage('orders')}
/>

<DashboardCard
 icon={<FaHeart size={22} color="#ff4f81" />}
 title="Wishlist Items"
 value={wishlist.length}
 subtitle="View wishlist"
 onClick={() => setPage('wishlist')}
/>

<DashboardCard
 icon={<FaHome size={22} color="#16a34a" />}
 title="Addresses"
 value="2"
 subtitle="Manage addresses"
 onClick={() => setPage('addresses')}
/>

<DashboardCard
 icon={<FaShieldAlt size={22} color="#15803d" />}
 title="Account Status"
 value="Active"
 subtitle="Verified Account"
/>
</div>
</div>

            <div
  style={{
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '25px',
    marginTop: '20px',
  }}
>
  {/* Recent Orders */}

  <div
  style={{
    
    borderRadius: '18px',
   padding: '20px',
    border: '1px solid #ececec',
  }}
>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    }}
  >
    <h2
      style={{
        color: '#2B0000',
        margin: 0,
      }}
    >
      Recent Orders
    </h2>

   <button
  onClick={() => setPage('orders')}
  style={{
    background: 'none',
    border: 'none',
    color: '#8B1A1A',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
  }}
>
  View All Orders →
</button>
  </div>

    {[
  {
  id: 'PHF1024',
  product: 'Boneless Chicken Pickle 1kg',
  qty: 1,
  amount: '₹1,200',
  date: '29 May 2026',
  status: 'Delivered',
  image: "/images/bone chicken pickle.jpg"
},
{
  id: 'PHF1023',
  product: 'Prawns Pickle 500g',
  qty: 2,
  amount: '₹1,600',
  date: '27 May 2026',
  status: 'Shipped',
  image: "/images/prawnspickle.webp"
},
{
  id: 'PHF1022',
  product: 'Mutton Pickle 1kg',
  qty: 1,
  amount: '₹1,350',
  date: '25 May 2026',
  status: 'Processing',
  image: "/images/MuttonPickle.jpg"
},
{
  id: 'PHF1021',
  product: 'Mixed Veg Pickle 500g',
  qty: 1,
  amount: '₹450',
  date: '22 May 2026',
  status: 'Delivered',
  image: "/images/pandumirchi-pickle.webp"
},
].map((order) => (
  <div
    key={order.id}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 0',
      borderBottom: '1px solid #eee',
    }}
  >
   <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  }}
>
  <img
    src={order.image}
    alt={order.product}
    style={{
      width: '70px',
      height: '70px',
      borderRadius: '10px',
      objectFit: 'cover',
    }}
  />

  <div>
    <h3 style={{ margin: '0 0 8px' }}>
      Order #{order.id}
    </h3>

    <p style={{ margin: '0 0 6px' }}>
      {order.product}
    </p>

    <span style={{ color: '#666' }}>
      Qty: {order.qty} • {order.amount}
    </span>
  </div>
</div>

   <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px',
  }}
>
  <span
    style={{
      color: '#777',
      fontSize: '14px',
    }}
  >
    {order.date}
  </span>

  <span
    style={{
      padding: '8px 16px',
      borderRadius: '20px',
      background:
        order.status === 'Delivered'
          ? '#EAF7EC'
          : order.status === 'Shipped'
          ? '#FFF3DD'
          : '#E8F0FF',
      color:
        order.status === 'Delivered'
          ? '#2E8B57'
          : order.status === 'Shipped'
          ? '#C17A00'
          : '#2A62D5',
    }}
  >
    {order.status}
  </span>
</div>
  </div>
 ))}
</div>

{/* Right Side */}
<div>
    <div
  style={{
    background: 'white',
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 5px 20px rgba(0,0,0,.08)',
    marginBottom: '20px',
  }}
>
  <div
  style={{
    display:'flex',
    justifyContent:'space-between',
    marginBottom:'20px',
  }}
>
  <h2
    style={{
      color:C.maroon,
      margin:0,
    }}
  >
    Profile Information
  </h2>

  <span
  onClick={() => setPage('editProfile')}
  style={{
    color: '#8B1A1A',
    cursor: 'pointer',
    fontWeight: '600',
  }}
>
  Edit Profile
</span>
</div>
  <div
    style={{
      width: '55px',
height: '55px',
fontSize: '22px',
      borderRadius: '50%',
      background: C.crimson,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
      marginBottom: '20px',
    }}
  >
   {profile?.name?.charAt(0)}
  </div>

  <h3>{profile?.name}</h3>
<p>{profile?.email}</p>
<p>{profile?.phone}</p>
</div>
<div
  style={{
    background: 'white',
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 5px 20px rgba(0,0,0,.08)',
  }}
>
  <h2
    style={{
      color: C.maroon,
      marginBottom: '20px',
    }}
  >
    Quick Actions
  </h2>

 <div
  onClick={() => setPage('products')}
  style={{
    cursor: 'pointer',
  }}
>
  🛒 Browse Products
</div>

  <hr />

  <div
  style={{ padding: '15px 0', cursor: 'pointer' }}
  onClick={() => setPage('trackorder')}
>
  🚚 Track Order
</div>

  <hr />

 <div
  style={{ padding: '15px 0', cursor: 'pointer' }}
  onClick={() => setPage('support')}
>
  🎧 Help & Support
</div>

  <hr />

 <div
  style={{ padding: '15px 0', cursor: 'pointer' }}
  onClick={() => setPage('offers')}
>
  🎁 Offers & Coupons
</div>
</div>
            </div>
          </div>
        </div>
</div>
</div>

<footer
  style={{
    background: '#3D0000',
    color: 'white',
    marginTop: '40px',
    padding: '35px 20px',
  }}
>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      textAlign: 'center',
      gap: '12px',
    }}
  >
    <div>
      <div style={{ fontSize: '18px' }}>🎁</div>
      <h3>100% Homemade</h3>
      <p>Premium Quality</p>
    </div>

    <div>
      <div style={{ fontSize: '18px' }}>🌿</div>
      <h3>No Preservatives</h3>
      <p>Pure & Natural</p>
    </div>

    <div>
      <div style={{ fontSize: '18px' }}>📦</div>
      <h3>Secure Packaging</h3>
      <p>Safe Delivery</p>
    </div>

    <div>
      <div style={{ fontSize: '18px' }}>🚚</div>
      <h3>Pan India Delivery</h3>
      <p>Fast & Reliable</p>
    </div>
  </div>
</footer>

<style>{`
.menu-btn{
  width:100%;
  background:transparent;
  border:none;
  color:white;
  text-align:left;
  padding:12px 14px;
  border-radius:10px;
  cursor:pointer;
  font-size:15px;
  margin-bottom:4px;
  transition:.3s;
}

.menu-btn:hover{
  background:#8B1A1A;
}

.active-menu{
  width:100%;
  background:#8B0000;
  color:white;
  border:none;
  padding:14px 16px;
  border-radius:12px;
  font-size:16px;
  font-weight:600;
  text-align:left;
  margin-bottom:18px;
}
`}</style>
    </div>
  )
}
function DashboardCard({
  icon,
  title,
  value,
  subtitle,
  onClick
}) {
  return (
    <div
  onClick={onClick}
  style={{
    cursor: 'pointer',
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: '16px',
        padding: '14px',
      }}
    >
      {/* Icon + Title Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '15px',
        }}
      >
        <div
          style={{
            width: '38px',
height: '38px',
            borderRadius: '12px',
            background: '#FFF6E5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          {title}
        </p>
      </div>

      <h2
        style={{
         fontSize: '24px',
          margin: '0 0 8px',
          color: '#111',
        }}
      >
        {value}
      </h2>

      <p
        style={{
          color: '#8B1A1A',
          fontSize: '12px',
          margin: 0,
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
