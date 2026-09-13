import type { AssignedHotel, Joiner } from '../types';

export const rahulPatil45Hotels: AssignedHotel[] = [
  { id: 1, name: 'Hotel Spice Villa', location: 'Kharadi', owner: 'Vikram Deshmukh', phone: '9823011223', orders: 14, joinedDate: '15 Jan 2024', status: 'Active' },
  { id: 2, name: 'Hotel Grand Food', location: 'Kharadi', owner: 'Suresh Mane', phone: '9823022334', orders: 15, joinedDate: '18 Jan 2024', status: 'Active' },
  { id: 3, name: 'Hotel Green Leaf', location: 'Mundhwa', owner: 'Rajesh Shinde', phone: '9823033445', orders: 12, joinedDate: '22 Jan 2024', status: 'Active' },
  { id: 4, name: 'Hotel Maharaja', location: 'EON IT Park', owner: 'Arvind Kulkarni', phone: '9823044556', orders: 18, joinedDate: '28 Jan 2024', status: 'Active' },
  { id: 5, name: 'Hotel Sai Sagar', location: 'Kharadi Bypass', owner: 'Santosh Patil', phone: '9823055667', orders: 10, joinedDate: '02 Feb 2024', status: 'Active' },
  { id: 6, name: 'Hotel Blue Diamond', location: 'Kharadi', owner: 'Anil Chavan', phone: '9823066778', orders: 8, joinedDate: '05 Feb 2024', status: 'Active' },
  { id: 7, name: 'Hotel Royal Treat', location: 'Mundhwa Road', owner: 'Deepak Pawar', phone: '9823077889', orders: 10, joinedDate: '10 Feb 2024', status: 'Active' },
  { id: 8, name: 'Hotel Sagar Plaza', location: 'Chandan Nagar', owner: 'Ramesh Jadhav', phone: '9823088990', orders: 8, joinedDate: '15 Feb 2024', status: 'Active' },
  { id: 9, name: 'Hotel Radhika Pure Veg', location: 'Kharadi', owner: 'Vinod Jagtap', phone: '9823099001', orders: 7, joinedDate: '20 Feb 2024', status: 'Active' },
  { id: 10, name: 'Hotel Shiv Sagar', location: 'Kharadi South', owner: 'Nitin More', phone: '9823100112', orders: 7, joinedDate: '25 Feb 2024', status: 'Active' },
  { id: 11, name: 'Hotel Panchali Executive', location: 'EON Free Zone', owner: 'Sachin Bhosale', phone: '9823111223', orders: 9, joinedDate: '01 Mar 2024', status: 'Active' },
  { id: 12, name: 'Hotel Woodlands Delight', location: 'Kharadi', owner: 'Pravin Salunkhe', phone: '9823122334', orders: 7, joinedDate: '05 Mar 2024', status: 'Active' },
  { id: 13, name: 'Hotel Shreyas Dining', location: 'Mundhwa', owner: 'Mahesh Nikam', phone: '9823133445', orders: 6, joinedDate: '10 Mar 2024', status: 'Active' },
  { id: 14, name: 'Hotel Vaishali Corner', location: 'Kharadi Central', owner: 'Sandeep Gite', phone: '9823144556', orders: 8, joinedDate: '14 Mar 2024', status: 'Active' },
  { id: 15, name: 'Hotel Roopali Express', location: 'EON IT Park', owner: 'Amit Sonawane', phone: '9823155667', orders: 6, joinedDate: '18 Mar 2024', status: 'Active' },
  { id: 16, name: 'Hotel Nisarg Garden', location: 'Thite Nagar', owner: 'Ganesh Ghodke', phone: '9823166778', orders: 5, joinedDate: '22 Mar 2024', status: 'Active' },
  { id: 17, name: 'Hotel Sukanta Thali', location: 'Kharadi', owner: 'Prashant Thorat', phone: '9823177889', orders: 8, joinedDate: '27 Mar 2024', status: 'Active' },
  { id: 18, name: 'Hotel Durvankur Dining', location: 'Mundhwa Bridge', owner: 'Hemant Kadam', phone: '9823188990', orders: 7, joinedDate: '02 Apr 2024', status: 'Active' },
  { id: 19, name: 'Hotel Mathura Veg Court', location: 'Kharadi', owner: 'Tushar Tambe', phone: '9823199001', orders: 6, joinedDate: '06 Apr 2024', status: 'Active' },
  { id: 20, name: 'Hotel Chaitanya Non Veg', location: 'Zensar Park', owner: 'Rohit Shirole', phone: '9823200112', orders: 5, joinedDate: '11 Apr 2024', status: 'Active' },
  { id: 21, name: 'Hotel Madhuban Family Resto', location: 'Kharadi', owner: 'Kiran Bankar', phone: '9823211223', orders: 6, joinedDate: '16 Apr 2024', status: 'Active' },
  { id: 22, name: 'Hotel Sarovar Portico', location: 'EON Zone', owner: 'Ajay Kokate', phone: '9823222334', orders: 11, joinedDate: '20 Apr 2024', status: 'Active' },
  { id: 23, name: 'Hotel Swagat Pure Veg', location: 'Chandan Nagar', owner: 'Sanjay Dhumal', phone: '9823233445', orders: 5, joinedDate: '25 Apr 2024', status: 'Active' },
  { id: 24, name: 'Hotel Rasoi Ghar', location: 'Kharadi', owner: 'Bharat Deshmukh', phone: '9823244556', orders: 5, joinedDate: '01 May 2024', status: 'Active' },
  { id: 25, name: 'Hotel Annapurna Bhavan', location: 'Mundhwa', owner: 'Vijay Patil', phone: '9823255667', orders: 6, joinedDate: '05 May 2024', status: 'Active' },
  { id: 26, name: 'Hotel Taste of Punjab', location: 'Kharadi Bypass', owner: 'Harpreet Singh', phone: '9823266778', orders: 7, joinedDate: '10 May 2024', status: 'Active' },
  { id: 27, name: 'Hotel Bawarchi Biryani', location: 'EON IT Park', owner: 'Imran Qureshi', phone: '9823277889', orders: 6, joinedDate: '15 May 2024', status: 'Active' },
  { id: 28, name: 'Hotel Golden Leaf Fine Dine', location: 'Kharadi', owner: 'Rahul Gaikwad', phone: '9823288990', orders: 8, joinedDate: '20 May 2024', status: 'Active' },
  { id: 29, name: 'Hotel Orchid Banquets', location: 'Mundhwa Road', owner: 'Sunil Jagtap', phone: '9823299001', orders: 4, joinedDate: '26 May 2024', status: 'Active' },
  { id: 30, name: 'Hotel Marriott Suites Cafe', location: 'Kharadi', owner: 'Siddharth Roy', phone: '9823300112', orders: 9, joinedDate: '01 Jun 2024', status: 'Active' },
  { id: 31, name: 'Hotel Lemon Tree Bistro', location: 'EON IT Park', owner: 'Vikram Joshi', phone: '9823311223', orders: 6, joinedDate: '06 Jun 2024', status: 'Active' },
  { id: 32, name: 'Hotel Novotel Dine', location: 'Kharadi', owner: 'Manish Sharma', phone: '9823322334', orders: 8, joinedDate: '12 Jun 2024', status: 'Active' },
  { id: 33, name: 'Hotel Hyatt Regency Kitchen', location: 'Kharadi Road', owner: 'Anupam Gupta', phone: '9823333445', orders: 11, joinedDate: '18 Jun 2024', status: 'Active' },
  { id: 34, name: 'Hotel Radisson Blu Pantry', location: 'Kharadi', owner: 'Rohit Nair', phone: '9823344556', orders: 9, joinedDate: '24 Jun 2024', status: 'Active' },
  { id: 35, name: 'Hotel Ibis Express', location: 'EON Zone', owner: 'Alok Verma', phone: '9823355667', orders: 6, joinedDate: '01 Jul 2024', status: 'Active' },
  { id: 36, name: 'Hotel Four Points Cafe', location: 'Kharadi Bypass', owner: 'Neeraj Kapoor', phone: '9823366778', orders: 5, joinedDate: '07 Jul 2024', status: 'Active' },
  { id: 37, name: 'Hotel Fairfield Kitchen', location: 'Chandan Nagar', owner: 'Gaurav Malhotra', phone: '9823377889', orders: 5, joinedDate: '14 Jul 2024', status: 'Active' },
  { id: 38, name: 'Hotel Westin Corner', location: 'Mundhwa', owner: 'Kunal Mehta', phone: '9823388990', orders: 4, joinedDate: '20 Jul 2024', status: 'Active' },
  { id: 39, name: 'Hotel Conrad Lounge', location: 'EON IT Park', owner: 'Varun Singhania', phone: '9823399001', orders: 4, joinedDate: '27 Jul 2024', status: 'Active' },
  { id: 40, name: 'Hotel Pride Executive', location: 'Kharadi', owner: 'Ashok Saxena', phone: '9823400112', orders: 4, joinedDate: '03 Aug 2024', status: 'Active' },
  { id: 41, name: 'Hotel Central Park Resto', location: 'Kharadi South', owner: 'Pradeep Agarwal', phone: '9823411223', orders: 3, joinedDate: '10 Aug 2024', status: 'Active' },
  { id: 42, name: 'Hotel Aurora Dine', location: 'Mundhwa Road', owner: 'Devendra Sen', phone: '9823422334', orders: 3, joinedDate: '18 Aug 2024', status: 'Inactive' },
  { id: 43, name: 'Hotel Kohinoor Treat', location: 'Chandan Nagar', owner: 'Shrikant Gadre', phone: '9823433445', orders: 3, joinedDate: '25 Aug 2024', status: 'Inactive' },
  { id: 44, name: 'Hotel St Laurn Cafe', location: 'EON Free Zone', owner: 'Omkar Joshi', phone: '9823444556', orders: 3, joinedDate: '01 Sep 2024', status: 'Inactive' },
  { id: 45, name: 'Hotel Deccan Bistro', location: 'Kharadi', owner: 'Yashwant Apte', phone: '9823455667', orders: 3, joinedDate: '07 Sep 2024', status: 'Inactive' },
];

const puneHotelNames = [
  'Hotel Spice Villa', 'Hotel Grand Food', 'Hotel Green Leaf', 'Hotel Maharaja', 'Hotel Sai Sagar',
  'Hotel Blue Diamond', 'Hotel Royal Treat', 'Hotel Sagar Plaza', 'Hotel Radhika Pure Veg', 'Hotel Shiv Sagar',
  'Hotel Panchali Executive', 'Hotel Woodlands Delight', 'Hotel Shreyas Dining', 'Hotel Vaishali Corner', 'Hotel Roopali Express',
  'Hotel Nisarg Garden', 'Hotel Sukanta Thali', 'Hotel Durvankur Dining', 'Hotel Mathura Veg Court', 'Hotel Chaitanya Non Veg',
  'Hotel Madhuban Family Resto', 'Hotel Sarovar Portico', 'Hotel Swagat Pure Veg', 'Hotel Rasoi Ghar', 'Hotel Annapurna Bhavan',
  'Hotel Taste of Punjab', 'Hotel Bawarchi Biryani', 'Hotel Golden Leaf Fine Dine', 'Hotel Orchid Banquets', 'Hotel Marriott Suites Cafe',
  'Hotel Lemon Tree Bistro', 'Hotel Novotel Dine', 'Hotel Hyatt Regency Kitchen', 'Hotel Radisson Blu Pantry', 'Hotel Ibis Express',
  'Hotel Four Points Cafe', 'Hotel Fairfield Kitchen', 'Hotel Westin Corner', 'Hotel Conrad Lounge', 'Hotel Pride Executive',
  'Hotel Central Park Resto', 'Hotel Aurora Dine', 'Hotel Kohinoor Treat', 'Hotel St Laurn Cafe', 'Hotel Deccan Bistro'
];

/**
 * Returns the complete list of hotels onboarded/joined by a given joiner.
 * If the joiner is Rahul Patil, returns the full verified 45 hotels list.
 * For other joiners, dynamically returns their exact count of assigned hotels.
 */
export const getHotelsForJoiner = (joiner: Joiner): AssignedHotel[] => {
  if (joiner.name === 'Rahul Patil' || joiner.id === 1) {
    return rahulPatil45Hotels;
  }

  // If already populated with sufficient items, return it
  if (joiner.assignedHotelsList && joiner.assignedHotelsList.length >= joiner.totalHotels) {
    return joiner.assignedHotelsList;
  }

  // Generate dynamic realistic hotels list matching joiner.totalHotels
  const count = joiner.totalHotels || 15;
  const list: AssignedHotel[] = [];
  const baseAvgOrders = Math.floor((joiner.totalOrders || 100) / count) || 5;

  for (let i = 0; i < count; i++) {
    const hotelBase = puneHotelNames[i % puneHotelNames.length];
    const suffix = i >= puneHotelNames.length ? ` Phase ${Math.floor(i / puneHotelNames.length) + 1}` : '';
    const isActive = i < Math.max(1, count - 2);
    const orders = Math.max(1, baseAvgOrders + ((i % 5) - 2));

    list.push({
      id: i + 1,
      name: `${hotelBase}${suffix}`,
      location: joiner.zone || 'Pune',
      owner: `Manager ${String.fromCharCode(65 + (i % 26))}. Kumar`,
      phone: `98${Math.floor(10000000 + (i * 123456) % 89999999)}`,
      orders: orders,
      joinedDate: `2024-0${(i % 8) + 1}-${10 + (i % 18)}`,
      status: isActive ? 'Active' : 'Inactive'
    });
  }

  return list;
};
