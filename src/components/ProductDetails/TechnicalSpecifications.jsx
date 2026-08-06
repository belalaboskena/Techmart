import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

function TechnicalSpecifications({ product }) {
  if (!product) return null;

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
        }}
      >
        Technical Specifications
      </Typography>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>{product.sku}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Weight</TableCell>
              <TableCell>{product.weight} g</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Width</TableCell>
              <TableCell>{product.dimensions?.width} cm</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{product.dimensions?.height} cm</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Depth</TableCell>
              <TableCell>{product.dimensions?.depth} cm</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>{product.category}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Stock</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TechnicalSpecifications;
