SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](255) NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[birthdate] [nvarchar](255) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[phone] [nvarchar](255) NULL,
	[homeTown] [nvarchar](255) NULL,
	[job] [nvarchar](255) NULL,
	[grade] [nvarchar](255) NOT NULL,
	[branch] [nvarchar](255) NOT NULL,
	[averageScore] [float] NULL,
	[highSchBranch] [nvarchar](255) NOT NULL,
	[role] [varchar](255) NULL,
	[password] [nvarchar](255) NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD CHECK  (([role]=N'admin' OR [role]=N'author' OR [role]=N'user'))
GO
