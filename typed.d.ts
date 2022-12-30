interface OnboardingData { title?: string, first_name?: string, last_name?: string, middle_name?: string, date_of_birth?: string, gender?: string, profile_image_id?: string, country_id?: string, state_id?: string }

 interface Qualifications {
        id: number;
        name: string;
        description: string;
        active: number;
 }
    
 interface QualificationsPostData {
        qualification_id: number;
        course_of_study: string;
        institution: string;
        month_of_graduation: number;
        year_of_graduation: number;
        
 }
    
 
     interface UserQualificationDetail {
        user_id: number;
        qualification_id: number;
        course_of_study?: any;
        institution: string;
            graduation_date: string;
            id: number;
    }

     interface UserQualification {
        id: number;
        name: string;
        description: string;
        active: number;
        detail: UserQualificationDetail;
     }
    
       interface WorkExperiencePostData {
        company_name: string;
        job_title: string;
        start_month: number;
        start_year: number;
        end_month: number;
        end_year: number;
        summary: string;
       }
    
       interface UserWorkHistory {
        id: number;
        user_id: number;
        company_name: string;
        job_title: string;
        start_date: string;
        end_date: string;
        summary: string;
        location?: any;
        created_at: Date;
        updated_at: Date;
        duration: string;
    }
