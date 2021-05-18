using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public bool AddNewLanguage(AddLanguageViewModel language)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            //Your code here;
            User profile = null;
            profile = await _userRepository.GetByIdAsync(Id);
            if (profile != null)
            {
                var videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var CV_Url = string.IsNullOrWhiteSpace(profile.CvName)
                    ? "" : await _fileService.GetFileURL(profile.CvName, FileType.UserCV);

                var Languages = profile.Languages.Select((x) => ViewModalFromLanguage(x)).ToList();

                var Skills = profile.Skills.Select((x) => ViewModelFromSkill(x)).ToList();

                var Education = profile.Education.Select((x) => ViewModalFromEducation(x)).ToList();

                var Certificates = profile.Certifications.Select((x) => ViewModalFromCertification(x)).ToList();

                var Experience = profile.Experience.Select((x) => ViewModalFromExpericense(x)).ToList();

                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,
                    FirstName = profile.FirstName,
                    MiddleName = profile.MiddleName,
                    LastName = profile.LastName,
                    Gender = profile.Gender,
                    Email = profile.Email,
                    Phone = profile.Phone,
                    MobilePhone = profile.MobilePhone,
                    IsMobilePhoneVerified = profile.IsMobilePhoneVerified,
                    Address = profile.Address,
                    Nationality = profile.Nationality,
                    VisaStatus = profile.VisaStatus,
                    VisaExpiryDate = profile.VisaExpiryDate,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    CvName = profile.CvName,
                    CvUrl = CV_Url,
                    Summary = profile.Summary,
                    Description = profile.Description,
                    LinkedAccounts = profile.LinkedAccounts,
                    JobSeekingStatus = profile.JobSeekingStatus,
                    Languages = Languages,
                    Skills = Skills,
                    Education = Education,
                    Certifications = Certificates,
                    Experience = Experience
                };
                return result;
            }
            return null;
            throw new NotImplementedException();
        }

       

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            //Your code here;
            User current_user = await _userRepository.GetByIdAsync(model.Id);
            current_user.LinkedAccounts = model.LinkedAccounts;
            current_user.Description = model.Description;
            current_user.Summary = model.Summary;
            current_user.FirstName = model.FirstName;
            current_user.LastName = model.LastName;
            current_user.Email = model.Email;
            current_user.Phone = model.Phone;
            current_user.Address = model.Address;
            current_user.Nationality = model.Nationality;
            current_user.VisaStatus = model.VisaStatus;
            current_user.VisaExpiryDate = model.VisaExpiryDate;
            current_user.ProfilePhoto = model.ProfilePhoto;
            current_user.ProfilePhotoUrl = model.ProfilePhotoUrl;
            current_user.JobSeekingStatus = model.JobSeekingStatus;

            var newLang = new List<UserLanguage>();
            foreach (var item in model.Languages)
            {
                var lang = current_user.Languages.SingleOrDefault(x => x.Id == item.Id);
                if (lang == null)
                {
                    lang = new UserLanguage
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        UserId = updaterId,
                        IsDeleted = false
                    };
                }
                UpdateLanguageFromView(item, lang);
                newLang.Add(lang);
            }
            current_user.Languages = newLang;


            var newSkills = new List<UserSkill>();
            foreach (var item in model.Skills)
            {
                var skill = current_user.Skills.SingleOrDefault(x => x.Id == item.Id);
                if (skill == null)
                {
                    skill = new UserSkill
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        UserId = updaterId,
                        IsDeleted = false
                    };
                }
                UpdateSkillFromView(item, skill);
                newSkills.Add(skill);
            }
            current_user.Skills = newSkills;

            var newExperience = new List<UserExperience>();
            foreach (var item in model.Experience)
            {
                var exp = current_user.Experience.SingleOrDefault(x => x.Id == item.Id);
                if (exp == null)
                {
                    exp = new UserExperience
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                     //   IsDeleted = false
                    };
                }
                UpdateExperienceFromView(item, exp);
                newExperience.Add(exp);
            }
            current_user.Experience = newExperience;

            await _userRepository.Update(current_user);
            return true;
            //throw new NotImplementedException();
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {

                var fileExtension = Path.GetExtension(file.FileName);
                List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

                if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
                {
                    return false;
                }

                var profile = (await _userRepository.Get(x => x.Id == talentId)).SingleOrDefault();

                if (profile == null)
                {
                    return false;
                }

                var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

                if (!string.IsNullOrWhiteSpace(newFileName))
                {
                    var oldFileName = profile.ProfilePhoto;

                    if (!string.IsNullOrWhiteSpace(oldFileName))
                    {
                        await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                    }

                    profile.ProfilePhoto = newFileName;
                    profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                    await _userRepository.Update(profile);
                    return true;
                }
            

          
            return false;
            //throw new NotImplementedException();
        }
        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
           // original.IsDeleted = model.IsDeleted;
        }
        protected void UpdateLanguageFromView(AddLanguageViewModel model, UserLanguage original)
        {
            original.LanguageLevel = model.Level;
            original.Language = model.Name;
          //  original.IsDeleted = model.IsDeleted;
        }

        protected void UpdateExperienceFromView(ExperienceViewModel model, UserExperience original)
        {
            original.Company = model.Company;
            original.Position = model.Position;
            original.Responsibilities = model.Responsibilities;
            original.Start = model.Start;
            original.End = model.End;
          //  original.IsDeleted = model.IsDeleted;
        }
        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill,
              //  IsDeleted = skill.IsDeleted
            };
        }
        protected AddLanguageViewModel ViewModalFromLanguage(UserLanguage languages)
        {
            return new AddLanguageViewModel
            {
                Id = languages.Id,
                Level = languages.LanguageLevel,
                Name = languages.Language,
                CurrentUserId = languages.UserId,
            //    IsDeleted = languages.IsDeleted
            };
        }

        protected AddEducationViewModel ViewModalFromEducation(UserEducation edu)
        {
            return new AddEducationViewModel
            {
                Id = edu.Id,
                Country = edu.Country,
                InstituteName = edu.InstituteName,
                Title = edu.Title,
                Degree = edu.Degree,
                YearOfGraduation = edu.YearOfGraduation
            };
        }

        protected ExperienceViewModel ViewModalFromExpericense(UserExperience exp)
        {
            return new ExperienceViewModel
            {
                Id = exp.Id,
                Company = exp.Company,
                Position = exp.Position,
                Responsibilities = exp.Responsibilities,
                Start = exp.Start,
                End = exp.End,
             //   IsDeleted = exp.IsDeleted
            };
        }

        protected AddCertificationViewModel ViewModalFromCertification(UserCertification certificate)
        {
            return new AddCertificationViewModel
            {
                Id = certificate.Id,
                CertificationName = certificate.CertificationName,
                CertificationFrom = certificate.CertificationFrom,
                CertificationYear = certificate.CertificationYear
            };
        }

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}