import { Grid, Box } from "@mui/material";
import Form from "components/Form";
import Modal from "components/Modal";
import Table from "components/Table";

const Services = () => {
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12}>
        <Box>
          <Modal title="Add new service" buttonText="Add new service">
            <Modal.Body>
              <Form
                onSubmit={() => {}}
                fields={[
                  {
                    name: "name",
                    label: "Name of service",
                    type: "text",
                  },
                  {
                    name: "description",
                    label: "Description of service",
                    type: "text",
                  },
                ]}
              />
            </Modal.Body>
          </Modal>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box>
          <Table />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Services;
