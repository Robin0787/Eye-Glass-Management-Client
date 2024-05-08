import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { TSellProductPayload } from "../../redux/Types/productAPIs.types";

// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    marginInline: "auto",
    borderRadius: "6px",
    backgroundColor: "#ffffff90",
    display: "flex",
    flexDirection: "column",
    padding: 12,
  },
  section: {
    padding: 12,
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: "6px",
  },
  heading: {
    padding: 16,
    margin: 5,
    fontSize: "26px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "18px",
  },
  bold: {
    fontWeight: "bold",
  },
});

// Create Document Component
const SaleInvoice = ({ data }: { data: TSellProductPayload }) => (
  <Document>
    <Page size="TABLOID" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Selling Invoice</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Product Name: <Text style={styles.bold}>{data.product}</Text>
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Buyer Name: <Text style={styles.bold}>{data.buyerName}</Text>
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Quantity: <Text style={styles.bold}>{data.quantity}</Text>
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Date: <Text style={styles.bold}>{data.date}</Text>
        </Text>
      </View>
    </Page>
  </Document>
);

export default SaleInvoice;
