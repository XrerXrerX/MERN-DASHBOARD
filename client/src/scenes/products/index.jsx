import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({ //declare isi data  
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false); //layouting

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse //collap information 
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery(); //jika data 
  const isNonMobile = useMediaQuery("(min-width: 1000px)"); //jika bukan mobile true or falase masuk nilai isNonMobile

  return (
    <Box m="1.5rem 2.5rem"> 
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? ( //makesure ada data dan bukan loading 
        <Box
          mt="20px"
          display="grid" //gunakan grid lebih mudah 
          gridTemplateColumns="repeat(4, minmax(0, 1fr))" //ulangin gruod sampai 4 1fr yang akan tampil 
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, //target div set gridcolmn undefined jika  iya span 4 atau ambil semuanya 
          }}
        >
{data && data.map(({ _id, name, description, price, rating, category, supply, stat }) => ( //dimasukan ke dalamyang sudah di isi di atas
  <Product
    key={_id}
    _id={_id}
    name={name}
    description={description}
    price={price}
    rating={rating}
    category={category}
    supply={supply}
    stat={stat}
  />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
