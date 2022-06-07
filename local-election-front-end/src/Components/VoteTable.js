import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey.A200,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

function VoteTable({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [municipality, setMunicipality] = useState("काठमाण्डौ महानगरपालिका");
  const [filteredData, setFilteredData] = useState(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setFilteredData(data.filter((dt) => dt.LocalBodyName === municipality));
  }, [municipality]);

  //const unique = [...new Set(data.map(item => item.LocalBodyName))];
  //console.log("filter",unique)

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <InputLabel id="test-select-label">पालिका छान्नुहोस्</InputLabel>
        <Select
          labelId="munci-select-label"
          id="munci-select"
          autoWidth
          value={municipality}
          onChange={(event) => setMunicipality(event.target.value)}
        >
          {[...new Set(data.map((item) => item.LocalBodyName))].map((row) => (
            <MenuItem value={row}>{row}</MenuItem>
          ))}
        </Select>
        <TableContainer>
          <Table aria-label="stickyHeader">
            <TableHead>
              <TableRow>
                <StyledTableCell>उम्मेदवारको नाम</StyledTableCell>
                <StyledTableCell>कुल प्राप्त मतहरू</StyledTableCell>
                <StyledTableCell>राजनीतिक दल</StyledTableCell>
                <StyledTableCell>टिप्पणीहरू</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow>
                    <TableCell>{row.CandidateName}</TableCell>
                    <TableCell>{row.TotalVotesRecieved}</TableCell>
                    <TableCell>{row.PoliticalPartyName}</TableCell>
                    <TableCell>{row.Remarks}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            color="primary"
          />
        </Stack>
      </Paper>
    </div>
  );
}

export default VoteTable;
