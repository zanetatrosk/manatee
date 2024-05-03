import ConfirmationDialog from "@components/confirmationDialog";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Button } from "@mui/material";
import { CHARACTER_SHEET, COMMON } from "constants/characterDefinition";
import { useNavigate } from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { usePostLevelUpByCharacterIdMutation } from "api/charactersApiSlice";
import { CharacterSheet } from "@definitions/characterSheet";
import PATHS from "constants/path";

export default function CharacterHeader({ character } : { character: CharacterSheet }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const closeDialog = () => {
        setOpen(false);
    };
    const [postLevelUp, { isLoading: loadingLevel }] = usePostLevelUpByCharacterIdMutation();
    const confirmAction = () => {
        postLevelUp({ id: character.id });
        closeDialog();
      };
return (
    <Grid container mb={1}>
        <Grid item container spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(PATHS.CHARACTERS)}
            >
              {CHARACTER_SHEET.ACTIONS.BACK}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<SaveAltIcon />}
              onClick={ async () => {
                  fetch(process.env.REACT_APP_API_URL + "characters/" + character.id + "/pdf")
                    .then((response) => response.blob())
                    .then((blob) => {
                      const url = window.URL.createObjectURL(new Blob([blob]));
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", character.info.characterName + ".pdf");
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode?.removeChild(link);
                    });
              }}
            >
              {CHARACTER_SHEET.ACTIONS.GENERATE_PDF}
            </Button>
          </Grid>
          <Grid item xs container justifyContent={"flex-end"} spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate( PATHS.CREATE_CHARACTER + "/" + character.id)
                }
              >
                {CHARACTER_SHEET.ACTIONS.REMAKE_CHARACTER}
              </Button>
            </Grid>
            <Grid item>
              {character.info.level < 20 && (
                <LoadingButton
                  variant="contained"
                  onClick={() => setOpen(true)}
                  loading={loadingLevel}
                >
                  {CHARACTER_SHEET.ACTIONS.LEVEL_UP}
                  <ConfirmationDialog
                    title={CHARACTER_SHEET.ACTIONS.LEVEL_UP}
                    description={
                      CHARACTER_SHEET.LEVEL_UP_MODAL.FIRST_PART +
                      ` ${character.info.characterName} ` +
                      CHARACTER_SHEET.LEVEL_UP_MODAL.SECOND_PART +
                      ` ${character.info.level + 1}` +
                      COMMON.QUESTION_MARK
                    }
                    openDialog={open}
                    confirmAction={confirmAction}
                    closeDialog={closeDialog}
                  />
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  )
}