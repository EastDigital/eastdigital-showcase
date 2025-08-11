export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          last_login_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          service: string | null
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          service?: string | null
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          service?: string | null
          status?: string | null
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          completion_days: number
          country: string
          created_at: string | null
          email: string
          id: string
          instant_proposal_paid: boolean | null
          instant_proposal_requested: boolean | null
          message: string | null
          name: string
          payment_id: string | null
          phone: string
          proposal_pdf_url: string | null
          status: Database["public"]["Enums"]["enquiry_status"] | null
          total_estimate: number | null
          updated_at: string | null
          uploaded_files: string[] | null
        }
        Insert: {
          completion_days: number
          country: string
          created_at?: string | null
          email: string
          id?: string
          instant_proposal_paid?: boolean | null
          instant_proposal_requested?: boolean | null
          message?: string | null
          name: string
          payment_id?: string | null
          phone: string
          proposal_pdf_url?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          total_estimate?: number | null
          updated_at?: string | null
          uploaded_files?: string[] | null
        }
        Update: {
          completion_days?: number
          country?: string
          created_at?: string | null
          email?: string
          id?: string
          instant_proposal_paid?: boolean | null
          instant_proposal_requested?: boolean | null
          message?: string | null
          name?: string
          payment_id?: string | null
          phone?: string
          proposal_pdf_url?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          total_estimate?: number | null
          updated_at?: string | null
          uploaded_files?: string[] | null
        }
        Relationships: []
      }
      enquiry_services: {
        Row: {
          created_at: string | null
          enquiry_id: string | null
          estimated_price: number | null
          id: string
          quantity: number | null
          sub_service_id: string | null
        }
        Insert: {
          created_at?: string | null
          enquiry_id?: string | null
          estimated_price?: number | null
          id?: string
          quantity?: number | null
          sub_service_id?: string | null
        }
        Update: {
          created_at?: string | null
          enquiry_id?: string | null
          estimated_price?: number | null
          id?: string
          quantity?: number | null
          sub_service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enquiry_services_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiry_services_sub_service_id_fkey"
            columns: ["sub_service_id"]
            isOneToOne: false
            referencedRelation: "sub_services"
            referencedColumns: ["id"]
          },
        ]
      }
      industries: {
        Row: {
          color: string
          created_at: string
          custom_color: string | null
          custom_icon_url: string | null
          description: string | null
          display_order: number
          icon_name: string
          id: string
          images: string[] | null
          is_active: boolean
          metric: string | null
          metric_display_label: string | null
          metric_label: string | null
          metric_label_display_label: string | null
          projects_count: string | null
          projects_count_label: string | null
          show_metric: boolean | null
          show_metric_label: boolean | null
          show_projects_count: boolean | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          custom_color?: string | null
          custom_icon_url?: string | null
          description?: string | null
          display_order?: number
          icon_name: string
          id?: string
          images?: string[] | null
          is_active?: boolean
          metric?: string | null
          metric_display_label?: string | null
          metric_label?: string | null
          metric_label_display_label?: string | null
          projects_count?: string | null
          projects_count_label?: string | null
          show_metric?: boolean | null
          show_metric_label?: boolean | null
          show_projects_count?: boolean | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          custom_color?: string | null
          custom_icon_url?: string | null
          description?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          images?: string[] | null
          is_active?: boolean
          metric?: string | null
          metric_display_label?: string | null
          metric_label?: string | null
          metric_label_display_label?: string | null
          projects_count?: string | null
          projects_count_label?: string | null
          show_metric?: boolean | null
          show_metric_label?: boolean | null
          show_projects_count?: boolean | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          admin_user_id: string
          created_at: string
          expires_at: string
          id: string
          is_used: boolean
          otp_hash: string
        }
        Insert: {
          admin_user_id: string
          created_at?: string
          expires_at: string
          id?: string
          is_used?: boolean
          otp_hash: string
        }
        Update: {
          admin_user_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_used?: boolean
          otp_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "otp_verifications_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_services: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          challenge: string | null
          client: string | null
          conversion_result: string | null
          created_at: string
          description: string | null
          duration: string | null
          engagement_result: string | null
          featured_image: string | null
          featured_image_alt: string | null
          featured_video: string | null
          gallery_image_alts: string[] | null
          gallery_images: string[] | null
          gallery_videos: string[] | null
          hero_image: string | null
          hero_image_alt: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          leads_result: string | null
          location: string | null
          name: string
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          show_in_carousel: boolean
          slug: string | null
          solution: string | null
          status: string | null
          subtitle: string | null
          tags: string[] | null
          team_size: string | null
          timeline_result: string | null
          updated_at: string
          video_thumbnail: string | null
        }
        Insert: {
          category?: string | null
          challenge?: string | null
          client?: string | null
          conversion_result?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          engagement_result?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          featured_video?: string | null
          gallery_image_alts?: string[] | null
          gallery_images?: string[] | null
          gallery_videos?: string[] | null
          hero_image?: string | null
          hero_image_alt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          leads_result?: string | null
          location?: string | null
          name: string
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          show_in_carousel?: boolean
          slug?: string | null
          solution?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          team_size?: string | null
          timeline_result?: string | null
          updated_at?: string
          video_thumbnail?: string | null
        }
        Update: {
          category?: string | null
          challenge?: string | null
          client?: string | null
          conversion_result?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          engagement_result?: string | null
          featured_image?: string | null
          featured_image_alt?: string | null
          featured_video?: string | null
          gallery_image_alts?: string[] | null
          gallery_images?: string[] | null
          gallery_videos?: string[] | null
          hero_image?: string | null
          hero_image_alt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          leads_result?: string | null
          location?: string | null
          name?: string
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          show_in_carousel?: boolean
          slug?: string | null
          solution?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          team_size?: string | null
          timeline_result?: string | null
          updated_at?: string
          video_thumbnail?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      sub_services: {
        Row: {
          base_price: number
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          minimum_quantity: number | null
          name: string
          parent_service_id: string | null
          pricing_unit: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          base_price?: number
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          minimum_quantity?: number | null
          name: string
          parent_service_id?: string | null
          pricing_unit?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          base_price?: number
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          minimum_quantity?: number | null
          name?: string
          parent_service_id?: string | null
          pricing_unit?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_services_parent_service_id_fkey"
            columns: ["parent_service_id"]
            isOneToOne: false
            referencedRelation: "parent_services"
            referencedColumns: ["id"]
          },
        ]
      }
      trusted_devices: {
        Row: {
          admin_user_id: string
          created_at: string
          device_fingerprint: string
          device_name: string | null
          id: string
          is_active: boolean
          last_used_at: string
        }
        Insert: {
          admin_user_id: string
          created_at?: string
          device_fingerprint: string
          device_name?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string
        }
        Update: {
          admin_user_id?: string
          created_at?: string
          device_fingerprint?: string
          device_name?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trusted_devices_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_project_slug: {
        Args: { title: string }
        Returns: string
      }
    }
    Enums: {
      enquiry_status: "pending" | "processing" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      enquiry_status: ["pending", "processing", "completed", "cancelled"],
    },
  },
} as const
