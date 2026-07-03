import { Box, Typography, Stack, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudUpload from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UploadFile = ({
   smallHeightLaptop,
   isMobile,
   isTab,
   handleDrop,
   handleDragOver,
   handleFileUpload,
   removeFile,
   handleNext,
   loading,
   disableNext,
}) => {
   const { uploadedFiles } = useSelector((state) => state.analysis);
   const { user } = useSelector((state) => state.user);

   const getMaxFileLimit = (plan) => {
      if (plan?.toLowerCase().includes("pro")) return 10;
      return 5;
   };

   const maxLimit = getMaxFileLimit(user?.plan);
   const planName = user?.plan
      ? `${user.plan.charAt(0).toUpperCase()}${user.plan.slice(1)}`
      : "Starter";

   const handleFileUploadWithToast = async (e) => {
      const files = e.target.files;
      if (files.length === 0) return;

      if (uploadedFiles.length + files.length > maxLimit) {
         toast.error(
            `You can only upload up to ${maxLimit} files in ${planName} plan`
         );
         return;
      }

      const invalidFiles = Array.from(files).filter(
         (file) =>
            !file.type.match(
               /(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)/
            )
      );

      if (invalidFiles.length > 0) {
         toast.error("Only PDF and DOC/DOCX files are allowed");
         return;
      }

      try {
         const result = await handleFileUpload(e); // should return { success, message }

         if (result?.success) {
            toast.success(`${files.length} file(s) uploaded successfully!`);
         } else if (result?.message) {
            // ❗ Show only backend error (e.g., "no credits")
            toast.error(result.message);
         }
         // ❌ No fallback toast here
      } catch (error) {
         const message =
            error?.response?.data?.message ||
            "An unexpected error occurred while uploading.";
         toast.error(message);
      }
   };

   const handleRemoveFileWithToast = (index) => {
      const fileName = uploadedFiles[index].name;
      removeFile(index);
      toast.info(`Removed file: ${fileName}`);
   };

   return (
      <Box
         className={`flex flex-col items-center justify-center ${
            smallHeightLaptop ? "gap-4" : "gap-8"
         } px-2 h-full`}
      >
         <Box
            sx={{
               width: { xs: "100%", sm: "620px" },
               padding: {
                  xs: "20px 15px",
                  sm: "30px 20px",
               },
               textAlign: "center",
               borderRadius: "16px",
               cursor: "pointer",
               background: "white",
            }}
            onClick={() => document.getElementById("fileUploadInput").click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
         >
            {loading ? (
               <CircularProgress sx={{ mb: 1 }} />
            ) : (
               <CloudUpload
                  sx={{ fontSize: 40, color: "#1890FF", mb: 1 }}
                  className="mx-auto"
               />
            )}
            <Typography
               sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: {
                     xs: "15px",
                     sm: smallHeightLaptop ? "16px" : "18px",
                  },
                  color: "#000000E0",
               }}
            >
               {isMobile || isTab
                  ? "Upload files"
                  : "Click or drag file to this area to upload"}
            </Typography>
            <Typography
               sx={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: {
                     xs: "13px",
                     sm: smallHeightLaptop ? "14px" : "16px",
                  },
                  mt: 1,
                  color: "#000000A3",
               }}
            >
               Multiple file upload supported - Make sure the file format is
               either PDF or DOC only. You should avoid uploading personal
               details.
            </Typography>
            <input
               id="fileUploadInput"
               type="file"
               hidden
               multiple
               accept=".pdf,.doc,.docx"
               onChange={handleFileUploadWithToast}
            />
         </Box>

         {uploadedFiles.length > 0 && (
            <Box
               sx={{
                  width: { xs: "100%", sm: "620px" },
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  height: "147px",
                  flexDirection: "column",
                  mb: 1,
               }}
            >
               <Box
                  sx={{
                     background: "#F5F5F5",
                     px: 0,
                     py: { xs: 1, sm: 1.5, md: 2 },
                     boxSizing: "border-box",
                     flexShrink: 0,
                     overflowX: "auto",
                  }}
               >
                  <Box sx={{ minWidth: "500px", px: 3 }}>
                     <Stack
                        direction={"row"}
                        justifyContent={{ xs: "start", sm: "space-between" }}
                        gap={4}
                        alignItems={"center"}
                        sx={{ height: "100%" }}
                     >
                        <Typography
                           sx={{
                              fontFamily: "Poppins",
                              fontWeight: 500,
                              color: "#0A3235",
                              fontSize: {
                                 xs: "15px",
                                 sm: smallHeightLaptop ? "14px" : "16px",
                              },
                              whiteSpace: "nowrap",
                           }}
                        >
                           Filename
                        </Typography>
                        <Typography
                           sx={{
                              fontFamily: "Poppins",
                              fontWeight: 400,
                              color: "#0A3235",
                              fontSize: {
                                 xs: "15px",
                                 sm: smallHeightLaptop ? "14px" : "16px",
                              },
                              whiteSpace: "nowrap",
                           }}
                        >
                           {planName} Plan : ({uploadedFiles.length}/{maxLimit}{" "}
                           files uploaded)
                        </Typography>
                     </Stack>
                  </Box>
               </Box>

               <Box
                  sx={{
                     overflowY: "auto",
                     background: "#FFFFFF",
                     pt: 0.25,
                     "&::-webkit-scrollbar": {
                        width: "8px",
                     },
                     "&::-webkit-scrollbar-track": {
                        background: "#FFFFFF",
                     },
                     "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#C0C0C0",
                        borderRadius: "4px",
                     },
                  }}
               >
                  {uploadedFiles.map((file, index) => (
                     <Box
                        key={index}
                        className="flex items-center justify-between py-2 px-6 bg-white"
                     >
                        <Typography
                           sx={{
                              fontFamily: "Poppins",
                              color: "#0A3235",
                              fontSize: {
                                 xs: "15px",
                                 sm: smallHeightLaptop ? "14px" : "16px",
                              },
                           }}
                        >
                           {file.name}
                        </Typography>
                        <DeleteForeverIcon
                           sx={{
                              color: "#909090",
                              cursor: "pointer",
                              borderRadius: "4px",
                              px: 0.5,
                              fontSize: { xs: "34px", sm: "28px" },
                              "&:hover": {
                                 background: "#DC393B",
                                 color: "#FFFFFF",
                              },
                           }}
                           onClick={() => handleRemoveFileWithToast(index)}
                        />
                     </Box>
                  ))}
               </Box>
            </Box>
         )}

         <Button
            onClick={handleNext}
            disabled={disableNext}
            sx={{
               mt: 2,
               backgroundColor: "#F0CB52",
               color: "#0A3235",
               fontFamily: "Poppins",
               borderRadius: "8px",
               fontWeight: 600,
               textTransform: "capitalize",
               padding: "14px 100px",
               "&:hover": {
                  backgroundColor: "#84F052",
               },
            }}
         >
            Next Step
         </Button>
      </Box>
   );
};

export default UploadFile;
