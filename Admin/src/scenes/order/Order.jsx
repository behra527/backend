import React, { useEffect, useState } from 'react';
import api from '../../api';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Button,
} from '@mui/material';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import Swal from 'sweetalert2';
import { formatCurrency } from '../../utils/currency';

function Order() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Swal.fire('Error', 'Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      Swal.fire('Success', 'Order status updated', 'success');
      fetchOrders();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to update order status', 'error');
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      pending: colors.redAccent[500],
      processing: colors.blueAccent[500],
      shipped: colors.blueAccent[700],
      delivered: colors.greenAccent[500],
      cancelled: colors.redAccent[700],
    };
    return statusMap[status?.toLowerCase()] || colors.gray[500];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Typography variant="h4" fontWeight="bold" color={colors.gray[100]}>
          📦 Order Management
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: colors.blueAccent[700] }}
          onClick={fetchOrders}
        >
          Refresh
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: colors.primary[400] }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: colors.gray[100] }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.gray[100] }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.gray[100] }}>Items</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.gray[100] }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.gray[100] }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.gray[100] }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.gray[100] }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id} hover>
                  <TableCell sx={{ color: colors.gray[100] }}>
                    {order._id?.slice(-8) || 'N/A'}
                  </TableCell>
                  <TableCell sx={{ color: colors.gray[100] }}>
                    <Typography variant="body2" fontWeight="bold">
                      {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                    </Typography>
                    <Typography variant="caption" color={colors.gray[400]}>
                      {order.shippingAddress?.email || order.userId?.email || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: colors.gray[100] }}>
                    {order.orderItems?.length || order.items?.length || 0} item(s)
                    <br />
                    <Typography variant="caption" color={colors.gray[400]}>
                      {order.orderItems?.[0]?.name || order.items?.[0]?.name || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: colors.greenAccent[500], fontWeight: 'bold' }}>
                    {formatCurrency(order.totalPrice || order.totalAmount || 0)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status || 'Pending'}
                      sx={{
                        bgcolor: getStatusColor(order.status),
                        color: colors.gray[100],
                        fontWeight: 'bold',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: colors.gray[100] }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        sx={{
                          bgcolor: colors.primary[500],
                          color: colors.gray[100],
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: colors.gray[700],
                          },
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: colors.gray[100], py: 4 }}>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Order;
