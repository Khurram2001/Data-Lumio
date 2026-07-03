import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  styled,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DataTable from "react-data-table-component";
import moment from "moment";
import api from "../../Repo/Repo";
import { TextPop } from "../../landing Page/Home";

const RootStyle = styled(Box)(({ theme }) => ({
  padding: "2% 2%",
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
}));

const IconBox = styled(Box)({
  width: "44px",
  height: "44px",
  background: "linear-gradient(90deg, #5671F1 0%, #17CEAD 100%)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const columns = [
  {
    name: "#",
    selector: (row, idx) => idx + 1,
    width: "100px",
  },
  {
    name: "Amount",
    selector: (row) => "$" + row.price,
  },
  {
    name: "Plan",
    selector: (row) => row.plan || "N/A",
  },
  {
    name: "Status",
    cell: (row) => (
      <Chip
        label={row.status === "succeeded" ? "Successful" : "Failed"}
        variant="filled"
        sx={{
          background: row.status === "succeeded" ? "#17CEAD" : "#FF0000",
          color: "#FFF",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: 500,
        }}
      />
    ),
  },
  {
    name: "Date",
    selector: (row) =>
      row.date
        ? moment.unix(Number(row.date)).format("DD-MM-YYYY • hh:mm A")
        : "N/A",
  },
];

const customStyles = {
  rows: {
    style: {
      borderRadius: "5px",
      background: "rgba(255, 255, 255, 1)",
      borderBottom: "1px solid rgba(182, 209, 221, 1)",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#1E4F6B",
      color: "white",
      fontSize: "16px",
      borderRadius: "5px",
      fontWeight: 500,
    },
  },
  cells: {
    style: {
      display: "flex",
      justifyContent: "center",
      lineBreak: "anyWhere",
    },
  },
  headCells: {
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
};

function HistorySection() {
  const [loading, setLoading] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.warn("⚠️ No email in localStorage. Cannot fetch payment history.");
      setLoading(false);
      return;
    }

    api
      .paymentHistory({ email })
      .then((res) => {
        console.log("✅ Payment response (array):", res.data);
        setPaymentHistory(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching payment history:", err);
        setPaymentHistory([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "30vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <RootStyle>
      {paymentHistory.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background: "#0A3235",
              padding: "12px 16px",
              borderRadius: "3px",
              margin: "32px 0px 24px 0px",
              flexWrap: "wrap",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.2}>
              <IconBox>
                <CardMembershipIcon sx={{ color: "#ffffff" }} />
              </IconBox>
              <Stack>
                <TextPop>Payment History</TextPop>
                <TextPop sx={{ fontSize: "12px", fontWeight: 500 }}>
                  Showing your recent transactions
                </TextPop>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: { xs: 3, md: 0 } }}
            >
              <TextPop sx={{ fontSize: "14px" }}>Status: </TextPop>
              <Stack
                sx={{
                  borderRadius: "36px",
                  background:
                    "linear-gradient(90deg, #5671F1 0%, #17CEAD 100%)",
                  color: "#FFF",
                  padding: {
                    xs: "4px 14px",
                    sm: "10px 24px",
                  },
                }}
                direction="row"
                alignItems="center"
              >
                <VerifiedIcon fontSize="small" sx={{ mr: 1 }} />
                Active
              </Stack>
            </Stack>
          </Box>

          <Stack sx={{ width: "100%" }}>
            <DataTable
              columns={columns}
              data={paymentHistory}
              customStyles={customStyles}
              pagination
              noDataComponent="There are no records to display"
            />
          </Stack>
        </Box>
      ) : (
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextPop sx={{ fontSize: "20px" }}>No payments made yet!</TextPop>
        </Stack>
      )}
    </RootStyle>
  );
}

export default HistorySection;
