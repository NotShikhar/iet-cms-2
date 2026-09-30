// Faculty directory as published on the One IET faculty profile portal (one.ietdavv.edu.in/facultyprofile.php).
// `departments` uses the slugs from src/data/departments.ts; a member can belong to more than one department.
// `headOf` marks the Head of that department. `responsibility` is set for the Director, Heads and other office-holders (the portal's "Director and Heads" tab).
import type { FacultyMember } from './types'

const photo = (file: string) => `https://one.ietdavv.edu.in/facphoto/faculty_photos/${file}`
export const FACULTY_PORTAL = 'https://one.ietdavv.edu.in/'

export const defaultFaculty: FacultyMember[] = [
  // Director and Heads
  { id: 'f38', name: 'Dr Pratosh Bansal', designation: 'Professor', departments: ['information-technology'], responsibility: 'Director', email: 'pbansal@ietdavv.edu.in', photo: photo('faculty_38.png') },
  { id: 'f13', name: 'Dr Ajay Verma', designation: 'Professor', departments: ['electronics-instrumentation'], headOf: 'electronics-instrumentation', responsibility: 'Head Electronics & Instrumentation, In charge Engineering Section (IET)', email: 'averma@ietdavv.edu.in', photo: photo('faculty_13.jpg') },
  { id: 'f59', name: 'Dr Shashi Prakash', designation: 'Professor', departments: ['applied-sciences', 'electronics-instrumentation'], headOf: 'applied-sciences', responsibility: 'Head Applied Sciences', email: 'sprakash@ietdavv.edu.in', photo: photo('faculty_59.jpg') },
  { id: 'f12', name: 'Dr Ashesh Tiwari', designation: 'Professor', departments: ['mechanical-engineering'], headOf: 'mechanical-engineering', responsibility: 'Head Mechanical Engineering', email: 'atiwari@ietdavv.edu.in', photo: photo('faculty_12.jpg') },
  { id: 'f45', name: 'Dr Ravi Sindal', designation: 'Professor & Head', departments: ['electronics-telecommunication'], headOf: 'electronics-telecommunication', responsibility: 'Head Electronics & Telecommunication', email: 'rsindal@ietdavv.edu.in', photo: photo('faculty_45.jpg') },
  { id: 'f22', name: 'Dr Govind Maheshwari', designation: 'Professor', departments: ['mechanical-engineering'], responsibility: 'Coordinator Centralized Placement Cell DAVV Indore', email: 'gmaheshwari@ietdavv.edu.in', photo: photo('faculty_22.jpg') },
  { id: 'f20', name: 'Dr Devendra Verma', designation: 'Professor', departments: ['mechanical-engineering'], responsibility: 'Head Bachelor of Design, Head MBA (TM)', email: 'dverma@ietdavv.edu.in', photo: photo('faculty_20.jpg') },
  { id: 'f64', name: 'Dr Uma Bhatt', designation: 'Professor', departments: ['electronics-telecommunication'], responsibility: 'Senior Superintendent, Examination', email: 'umabhatt@ietdavv.edu.in', photo: photo('faculty_64.jpg') },
  { id: 'f23', name: 'Dr Hemant Makwana', designation: 'Professor', departments: ['information-technology'], headOf: 'information-technology', responsibility: 'Head Information Technology, In charge EDP', email: 'hmakwana@ietdavv.edu.in', photo: photo('faculty_23.png') },
  { id: 'f44', name: 'Dr Rohit Pathak', designation: 'Associate Professor', departments: ['applied-sciences'], responsibility: 'Professor In charge Purchase', email: 'rpathak@ietdavv.edu.in', photo: photo('faculty_44.jpg') },
  { id: 'f3', name: 'Dr Ashish Jain', designation: 'Professor', departments: ['computer-engineering'], headOf: 'computer-engineering', responsibility: 'Head Computer Science Engineering', email: 'ajain@ietdavv.edu.in', photo: photo('faculty_3.jpg') },
  { id: 'f17', name: 'Dr Chandra Prakash Patidar', designation: 'Associate Professor', departments: ['computer-science-business-systems', 'information-technology'], headOf: 'computer-science-business-systems', responsibility: 'Head Computer Science & Business Systems', email: 'cpatidar@ietdavv.edu.in', photo: photo('faculty_17.jpg') },
  { id: 'f51', name: 'Dr Shivangi Bande', designation: 'Professor', departments: ['electronics-instrumentation'], responsibility: 'In charge PhD Cell', email: 'sbande@ietdavv.edu.in', photo: photo('faculty_51.jpg') },
  { id: 'f68', name: 'Dr Vijay Karma', designation: 'Professor', departments: ['civil-engineering', 'mechanical-engineering'], headOf: 'civil-engineering', responsibility: 'Head Civil Engineering', email: 'vkarma@ietdavv.edu.in', photo: photo('faculty_68.jpg') },

  // Applied Sciences
  { id: 'f56', name: 'Dr Shailendra Singh Khinchi', designation: 'Professor', departments: ['applied-sciences'], email: 'skhinchi@ietdavv.edu.in', photo: photo('faculty_56.jpg') },
  { id: 'f50', name: 'Dr Sufia Aziz', designation: 'Associate Professor', departments: ['applied-sciences'], email: 'saziz@ietdavv.edu.in', photo: photo('faculty_50.jpg') },
  { id: 'f16', name: 'Dr Chandrashekhar Chauhan', designation: 'Associate Professor', departments: ['applied-sciences'], email: 'cchauhan@ietdavv.edu.in', photo: photo('faculty_16.jpg') },
  { id: 'f18', name: 'Dr Dheeraj Mandloi', designation: 'Associate Professor', departments: ['applied-sciences'], email: 'dmandloi@ietdavv.edu.in', photo: photo('faculty_18.jpg') },
  { id: 'f29', name: 'Dr Jitendra Singh', designation: 'Assistant Professor', departments: ['applied-sciences'], email: 'jsingh@ietdavv.edu.in', photo: photo('faculty_29.jpg') },
  { id: 'f11', name: 'Dr Arti Sharan', designation: 'Assistant Professor', departments: ['applied-sciences'], email: 'asharan@ietdavv.edu.in', photo: photo('faculty_11.jpg') },
  { id: 'f43', name: 'Dr Rachana Gupta', designation: 'Assistant Professor', departments: ['applied-sciences'], email: 'rgupta@ietdavv.edu.in', photo: photo('faculty_43.jpg') },
  { id: 'f46', name: 'Dr Ruchi Singh', designation: 'Assistant Professor', departments: ['applied-sciences'], email: 'rsingh@ietdavv.edu.in', photo: photo('faculty_46.jpg') },

  // Computer Science & Engineering
  { id: 'f21', name: 'Dr Gend Lal Prajapati', designation: 'Professor', departments: ['computer-engineering'], email: 'glprajapati@ietdavv.edu.in', photo: photo('faculty_21.jpg') },
  { id: 'f34', name: 'Dr Meena Sharma', designation: 'Professor', departments: ['computer-engineering'], email: 'msharma@ietdavv.edu.in', photo: photo('faculty_34.jpg') },
  { id: 'f66', name: 'Dr Vaibhav Jain', designation: 'Professor', departments: ['computer-engineering'], email: 'vjain@ietdavv.edu.in', photo: photo('faculty_66.jpg') },
  { id: 'f35', name: 'Nilima Karankar', designation: 'Associate Professor', departments: ['computer-engineering'], email: 'nkarankar@ietdavv.edu.in', photo: photo('faculty_35.jpg') },
  { id: 'f27', name: 'Jyoti Haweliya', designation: 'Associate Professor', departments: ['computer-engineering'], email: 'jhaweliya@ietdavv.edu.in', photo: photo('faculty_27.jpg') },
  { id: 'f1', name: 'Arpit Agrawal', designation: 'Associate Professor', departments: ['computer-engineering'], email: 'aagrawal@ietdavv.edu.in', photo: photo('faculty_1.jpg') },
  { id: 'f8', name: 'Amit Mittal', designation: 'Associate Professor', departments: ['computer-engineering'], email: 'amittal@ietdavv.edu.in', photo: photo('faculty_8.jpg') },
  { id: 'f30', name: 'Dr Jitendra Soni', designation: 'Associate Professor', departments: ['computer-engineering'], email: 'jsoni@ietdavv.edu.in', photo: photo('faculty_30.jpg') },
  { id: 'f32', name: 'Lalit Gehlod', designation: 'Associate Professor', departments: ['computer-engineering'], email: 'lgehlod@ietdavv.edu.in', photo: photo('faculty_32.jpg') },
  { id: 'f65', name: 'Dr Vedpriya Dongre', designation: 'Assistant Professor', departments: ['computer-engineering'], email: 'vdongre@ietdavv.edu.in', photo: photo('faculty_65.jpg') },
  { id: 'f7', name: 'Dr Aditya Makwe', designation: 'Assistant Professor', departments: ['computer-engineering'], email: 'amakwe@ietdavv.edu.in', photo: photo('faculty_7.jpg') },
  { id: 'f48', name: 'Ravindra Verma', designation: 'Assistant Professor', departments: ['computer-engineering'], email: 'rverma@ietdavv.edu.in', photo: photo('faculty_48.jpg') },

  // Electronics & Instrumentation
  { id: 'f4', name: 'Amit Jha', designation: 'Assistant Professor', departments: ['electronics-instrumentation'], email: 'ajha@ietdavv.edu.in', photo: photo('faculty_4.jpg') },
  { id: 'f58', name: 'Dr Shailendra Kumar Pathak', designation: 'Assistant Professor', departments: ['electronics-instrumentation'], email: 'spathak@ietdavv.edu.in', photo: photo('faculty_58.jpg') },
  { id: 'f63', name: 'Dr Tapesh Sarsodia', designation: 'Assistant Professor', departments: ['electronics-instrumentation'], email: 'tsarsodia@ietdavv.edu.in', photo: photo('faculty_63.jpg') },
  { id: 'f41', name: 'Dr Priyanka Sharma', designation: 'Assistant Professor', departments: ['electronics-instrumentation'], email: 'psharma@ietdavv.edu.in', photo: photo('faculty_41.png') },
  { id: 'f24', name: 'Dr Hemlata Pal', designation: 'Assistant Professor', departments: ['electronics-instrumentation'], email: 'hpal@ietdavv.edu.in', photo: photo('faculty_24.jpg') },
  { id: 'f55', name: 'Shahid Khilji', designation: 'Assistant Professor', departments: ['electronics-instrumentation'], email: 'skhilji@ietdavv.edu.in', photo: photo('faculty_55.jpg') },

  // Electronics & Telecommunication
  { id: 'f39', name: 'Dr Priyadarshi Ashok', designation: 'Professor', departments: ['electronics-telecommunication'], email: 'pdahat@ietdavv.edu.in', photo: photo('faculty_39.jpg') },
  { id: 'f19', name: 'Dr Dhiraj Nitnawwre', designation: 'Professor', departments: ['electronics-telecommunication'], email: 'dnitnawwre@ietdavv.edu.in', photo: photo('faculty_19.jpg') },
  { id: 'f69', name: 'Dr Vaibhav Neema', designation: 'Professor', departments: ['electronics-telecommunication'], email: 'vneema@ietdavv.edu.in', photo: photo('faculty_69.jpg') },
  { id: 'f47', name: 'Dr Raksha Upadhyay', designation: 'Professor', departments: ['electronics-telecommunication'], email: 'rupadhyay@ietdavv.edu.in', photo: photo('faculty_47.jpg') },
  { id: 'f33', name: 'Dr Madhvi Jangalwa', designation: 'Professor', departments: ['electronics-telecommunication'], email: 'mjangalwa@ietdavv.edu.in', photo: photo('faculty_33.jpg') },
  { id: 'f42', name: 'Praveen Singh', designation: 'Associate Professor', departments: ['electronics-telecommunication'], email: 'psingh@ietdavv.edu.in', photo: photo('faculty_42.jpg') },
  { id: 'f53', name: 'Seema Chouhan', designation: 'Associate Professor', departments: ['electronics-telecommunication'], email: 'schouhan@ietdavv.edu.in', photo: photo('faculty_53.jpg') },
  { id: 'f10', name: 'Dr Anita Seth', designation: 'Assistant Professor', departments: ['electronics-telecommunication'], email: 'aseth@ietdavv.edu.in', photo: photo('faculty_10.jpg') },
  { id: 'f57', name: 'Sneha Moghe', designation: 'Assistant Professor', departments: ['electronics-telecommunication'], email: 'smoghe@ietdavv.edu.in', photo: photo('faculty_57.jpg') },
  { id: 'f14', name: 'Dr Brahman Singh Bhalavi', designation: 'Assistant Professor', departments: ['electronics-telecommunication'], email: 'bbhalavi@ietdavv.edu.in', photo: photo('faculty_14.jpg') },
  { id: 'f9', name: 'Dr Ashish Panchal', designation: 'Assistant Professor', departments: ['electronics-telecommunication'], email: 'apanchal@ietdavv.edu.in', photo: photo('faculty_9.jpg') },
  { id: 'f60', name: 'Dr Sangeeta Solanki', designation: 'Assistant Professor', departments: ['electronics-telecommunication'], email: 'ssolanki@ietdavv.edu.in', photo: photo('faculty_60.jpg') },

  // Information Technology
  { id: 'f70', name: 'Dr Vrinda Tokekar', designation: 'Professor', departments: ['information-technology'], email: 'vtokekar@ietdavv.edu.in', photo: photo('faculty_70.jpg') },
  { id: 'f67', name: 'Dr Vivek Kapoor', designation: 'Professor', departments: ['information-technology'], email: 'vkapoor@ietdavv.edu.in', photo: photo('faculty_67.jpg') },
  { id: 'f15', name: 'Dr Bhawna Nigam', designation: 'Professor', departments: ['information-technology'], email: 'bnigam@ietdavv.edu.in' },
  { id: 'f40', name: 'Praveen Karma', designation: 'Associate Professor', departments: ['information-technology'], email: 'pkarma@ietdavv.edu.in', photo: photo('faculty_40.jpg') },
  { id: 'f28', name: 'Dr Jagdish Raikwal', designation: 'Associate Professor', departments: ['information-technology'], email: 'jraikwal@ietdavv.edu.in', photo: photo('faculty_28.jpg') },
  { id: 'f49', name: 'Dr Ravindra Yadav', designation: 'Assistant Professor', departments: ['information-technology'], email: 'ryadav@ietdavv.edu.in', photo: photo('faculty_49.jpg') },
  { id: 'f26', name: 'Dr Jay Singh', designation: 'Assistant Professor', departments: ['information-technology'], email: 'jaysingh@ietdavv.edu.in', photo: photo('faculty_26.jpg') },
  { id: 'f71', name: 'Vikas Vankhede', designation: 'Assistant Professor', departments: ['information-technology'], email: 'vvankhede@ietdavv.edu.in', photo: photo('faculty_71.jpg') },

  // Mechanical Engineering
  { id: 'f52', name: 'Dr Sharad Chaudhary', designation: 'Professor', departments: ['mechanical-engineering'], email: 'schaudhary@ietdavv.edu.in', photo: photo('faculty_52.jpg') },
  { id: 'f62', name: 'Dr Suwarna Torgal', designation: 'Professor', departments: ['mechanical-engineering'], email: 'storgal@ietdavv.edu.in', photo: photo('faculty_62.jpg') },
  { id: 'f36', name: 'Dr Nagendra Sohani', designation: 'Professor', departments: ['mechanical-engineering'], email: 'nsohani@ietdavv.edu.in' },
  { id: 'f6', name: 'Dr Akhilesh Lodwal', designation: 'Associate Professor', departments: ['mechanical-engineering'], email: 'alodwal@ietdavv.edu.in', photo: photo('faculty_6.jpg') },
  { id: 'f5', name: 'Dr Amit Kumar Gupta', designation: 'Associate Professor', departments: ['mechanical-engineering'], email: 'akgupta@ietdavv.edu.in', photo: photo('faculty_5.jpg') },
  { id: 'f25', name: 'Ibrahim Hussain', designation: 'Associate Professor', departments: ['mechanical-engineering'], email: 'ihussain@ietdavv.edu.in', photo: photo('faculty_25.jpg') },
  { id: 'f31', name: 'Jyoti Soni', designation: 'Assistant Professor', departments: ['mechanical-engineering'], email: 'jyotisoni@ietdavv.edu.in', photo: photo('faculty_31.jpg') },
  { id: 'f54', name: 'Santosh Kansal', designation: 'Assistant Professor', departments: ['mechanical-engineering'], email: 'skansal@ietdavv.edu.in', photo: photo('faculty_54.jpg') },
  { id: 'f2', name: 'Ajeet Bergaley', designation: 'Assistant Professor', departments: ['mechanical-engineering'], email: 'abergaley@ietdavv.edu.in', photo: photo('faculty_2.jpg') },
  { id: 'f37', name: 'Dr Omprakash Sondhiya', designation: 'Assistant Professor', departments: ['mechanical-engineering'], email: 'osondhiya@ietdavv.edu.in', photo: photo('faculty_37.jpg') },
]

const RANK = ['Professor & Head', 'Professor', 'Associate Professor', 'Assistant Professor']

/** Members of a department, heads first, then by designation (keeps list order within a rank). */
export function facultyFor(all: FacultyMember[], slug: string) {
  const rank = (m: FacultyMember) => {
    if (m.headOf === slug) return -1
    const i = RANK.indexOf(m.designation)
    return i === -1 ? RANK.length : i
  }
  return all
    .map((m, i) => ({ m, i }))
    .filter(({ m }) => m.departments.includes(slug))
    .sort((a, b) => rank(a.m) - rank(b.m) || a.i - b.i)
    .map(({ m }) => m)
}
